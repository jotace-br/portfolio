'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import dynamic from 'next/dynamic';
import { HeroSection } from './hero-section';

function StaticGridBackground() {
	return (
		<div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
			<div
				className='absolute inset-0 opacity-20 dark:opacity-15'
				style={{
					backgroundImage: `
						linear-gradient(to right, currentColor 1px, transparent 1px),
						linear-gradient(to bottom, currentColor 1px, transparent 1px)
					`,
					backgroundSize: '60px 60px',
				}}
			/>
			<div className='absolute inset-0 bg-linear-to-b rom-background via-transparent to-background' />
			<div className='absolute inset-0 bg-linear-to-r from-background via-transparent to-background opacity-50' />
			<div
				className='absolute inset-0'
				style={{
					background:
						'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)',
				}}
			/>
		</div>
	);
}

// Lazy load the heavy GridScan wrapper (THREE.js, postprocessing ~1MB+)
// This prevents blocking FCP/LCP with heavy JavaScript parsing
const GridScanWithConfig = dynamic(
	() =>
		import('./hero-grid-scan-wrapper').then((mod) => ({
			default: mod.HeroGridScanWrapper,
		})),
	{
		ssr: false,
		loading: () => <StaticGridBackground />,
	}
);

function HeroSectionWithGridScan() {
	const { shouldReduceMotion } = useReducedMotion();

	return (
		<div className='relative min-h-screen w-full'>
			{shouldReduceMotion ? <StaticGridBackground /> : <GridScanWithConfig />}
			<HeroSection />
		</div>
	);
}

export { HeroSectionWithGridScan };
