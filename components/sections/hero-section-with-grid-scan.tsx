'use client';

import { useGridScanConfig } from '@/hooks/use-grid-scan-config';
import { GridScan } from '../backgrounds/grid-scan';
import { HeroSection } from './hero-section';

function HeroSectionWithGridScan() {
	const gridConfig = useGridScanConfig();

	return (
		<div className='relative min-h-screen w-full'>
			<div className='absolute inset-0 pointer-events-none'>
				<GridScan
					{...gridConfig}
					className='w-full h-full pointer-events-auto'
				/>
			</div>
			<HeroSection />
		</div>
	);
}

export { HeroSectionWithGridScan };
