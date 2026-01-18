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

function checkLowEndDevice(): boolean {
	if (typeof window === 'undefined') return false;

	if (cachedIsLowEndDevice !== null) return cachedIsLowEndDevice;

	// Device Memory API (Chrome/Edge)
	const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
		.deviceMemory;

	if (deviceMemory !== undefined && deviceMemory < 4) {
		cachedIsLowEndDevice = true;
		return true;
	}

	// Hardware concurrency (CPU cores)
	if (
		navigator.hardwareConcurrency !== undefined &&
		navigator.hardwareConcurrency < 4
	) {
		cachedIsLowEndDevice = true;
		return true;
	}

	// Network Information API - check if user prefers data saving
	const connection = (
		navigator as Navigator & {
			connection?: { saveData?: boolean; effectiveType?: string };
		}
	).connection;

	if (connection?.saveData) {
		cachedIsLowEndDevice = true;
		return true;
	}

	// Check for slow connection types
	if (
		connection?.effectiveType &&
		['slow-2g', '2g', '3g'].includes(connection.effectiveType)
	) {
		cachedIsLowEndDevice = true;
		return true;
	}

	cachedIsLowEndDevice = false;
	return false;
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
