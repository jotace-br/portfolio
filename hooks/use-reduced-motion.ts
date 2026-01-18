'use client';

import { useSyncExternalStore } from 'react';

interface ReducedMotionConfig {
	/** True if user prefers reduced motion */
	prefersReducedMotion: boolean;
	/** True if device is low-end (limited hardware) */
	isLowEndDevice: boolean;
	/** True if animations should be disabled (either reduced motion or low-end device) */
	shouldReduceMotion: boolean;
}

let cachedIsLowEndDevice: boolean | null = null;
let hasCheckedClient = false;

function checkLowEndDevice(): boolean {
	// Always return false on server - we'll check properly on client
	if (typeof window === 'undefined') {
		return false;
	}

	// Return cached value only if we've done a proper client-side check
	if (hasCheckedClient && cachedIsLowEndDevice !== null) {
		return cachedIsLowEndDevice;
	}

	// Mark that we're doing a client-side check
	hasCheckedClient = true;
	
	let isLowEnd = false;

	try {
		// 1. Device Memory API (Chrome/Edge) - < 4GB is considered low-end
		const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
			.deviceMemory;

		if (deviceMemory !== undefined && deviceMemory <= 4) {
			isLowEnd = true;
		}

		// 2. Hardware concurrency (CPU cores) - < 4 cores is low-end
		if (
			navigator.hardwareConcurrency !== undefined &&
			navigator.hardwareConcurrency <= 4
		) {
			isLowEnd = true;
		}

		// 3. Network Information API - check if user prefers data saving
		const connection = (
			navigator as Navigator & {
				connection?: { 
					saveData?: boolean; 
					effectiveType?: string;
					downlink?: number;
					rtt?: number;
				};
			}
		).connection;

		if (connection) {
			// Save-data header indicates user wants lighter experience
			if (connection.saveData === true) {
				isLowEnd = true;
			}

			// Check for slow connection types
			if (
				connection.effectiveType &&
				['slow-2g', '2g', '3g'].includes(connection.effectiveType)
			) {
				isLowEnd = true;
			}

			// Check actual downlink speed (< 1.5 Mbps is slow)
			if (connection.downlink !== undefined && connection.downlink < 1.5) {
				isLowEnd = true;
			}

			// Check round-trip time (> 400ms is slow)
			if (connection.rtt !== undefined && connection.rtt > 400) {
				isLowEnd = true;
			}
		}

		// 4. User Agent detection for known low-end devices
		const ua = navigator.userAgent.toLowerCase();
		const lowEndPatterns = [
			/android.*;\s*(sm-[ajng]\d{3}|gt-[ips]\d{4})/i, // Older Samsung devices
			/android\s[1-4]\./i, // Android 4.x and below
			/windows phone/i,
			/blackberry/i,
			/opera mini/i,
		];

		if (lowEndPatterns.some(pattern => pattern.test(ua))) {
			isLowEnd = true;
		}

		// 5. Battery level check (if charging and < 20%, be conservative)
		if ('getBattery' in navigator) {
			(navigator as Navigator & {
				getBattery?: () => Promise<{
					level: number;
					charging: boolean;
				}>;
			})
				.getBattery?.()
				?.then(battery => {
					if (!battery.charging && battery.level < 0.2) {
						cachedIsLowEndDevice = true;
					}
				})
				.catch(() => {
					// Battery API failed, ignore
				});
		}

		// 6. Performance memory check (if available)
		const performance = window.performance as Performance & {
			memory?: {
				jsHeapSizeLimit: number;
				totalJSHeapSize: number;
				usedJSHeapSize: number;
			};
		};

		if (performance.memory) {
			// If heap size limit is less than 1GB, consider low-end
			const heapLimitGB = performance.memory.jsHeapSizeLimit / (1024 ** 3);
			if (heapLimitGB < 1) {
				isLowEnd = true;
			}
		}
	} catch (error) {
		// If any check fails, default to false (assume capable device)
		console.warn('Low-end device detection error:', error);
	}

	cachedIsLowEndDevice = isLowEnd;
	return isLowEnd;
}

function subscribeToReducedMotion(callback: () => void): () => void {
	if (typeof window === 'undefined') return () => {};

	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	mediaQuery.addEventListener('change', callback);

	return () => {
		mediaQuery.removeEventListener('change', callback);
	};
}

function getReducedMotionSnapshot(): boolean {
	if (typeof window === 'undefined') return false;

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot(): boolean {
	return false;
}

function getLowEndDeviceSnapshot(): boolean {
	return checkLowEndDevice();
}

function subscribeToLowEndDevice(): () => void {
	return () => {};
}

/**
 * Detects if the user has a preference for reduced motion or is using a low-end device.
 *
 * Checks:
 * - CSS prefers-reduced-motion media query
 * - Device memory API (< 4GB considered low-end)
 * - Hardware concurrency (< 4 cores considered low-end)
 * - Network Information API:
 *   - navigator.connection.saveData preference
 *   - navigator.connection.effectiveType indicates a slow connection (slow-2g, 2g, 3g)
 *
 * @returns Configuration object with motion preference details
 */
export function useReducedMotion(): ReducedMotionConfig {
	const prefersReducedMotion = useSyncExternalStore(
		subscribeToReducedMotion,
		getReducedMotionSnapshot,
		getServerSnapshot
	);

	const isLowEndDevice = useSyncExternalStore(
		subscribeToLowEndDevice,
		getLowEndDeviceSnapshot,
		getServerSnapshot
	);

	return {
		prefersReducedMotion,
		isLowEndDevice,
		shouldReduceMotion: prefersReducedMotion || isLowEndDevice,
	};
}

/**
 * SSR-safe check for reduced motion.
 * Returns true on server (safe default), actual value on client.
 */
export function getReducedMotionSSR(): boolean {
	if (typeof window === 'undefined') return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
