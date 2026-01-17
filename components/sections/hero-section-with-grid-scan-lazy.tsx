'use client';

import dynamic from 'next/dynamic';
import { HeroSection } from './hero-section';

// Lazy load the heavy GridScan wrapper (THREE.js, face-api.js, postprocessing ~1MB+)
// This prevents blocking FCP/LCP with heavy JavaScript parsing
const GridScanWithConfig = dynamic(
	() =>
		import('./hero-grid-scan-wrapper').then((mod) => ({
			default: mod.HeroGridScanWrapper,
		})),
	{
		ssr: false,
		loading: () => (
			<div className='absolute inset-0 pointer-events-none'>
				<div
					className='w-full h-full opacity-30'
					style={{
						backgroundImage: `
							linear-gradient(to right, rgb(57 46 78 / 0.3) 1px, transparent 1px),
							linear-gradient(to bottom, rgb(57 46 78 / 0.3) 1px, transparent 1px)
						`,
						backgroundSize: '40px 40px',
					}}
				/>
			</div>
		),
	}
);

function HeroSectionWithGridScan() {
	return (
		<div className='relative min-h-screen w-full'>
			<GridScanWithConfig />
			<HeroSection />
		</div>
	);
}

export { HeroSectionWithGridScan };
