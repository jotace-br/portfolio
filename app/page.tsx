'use client';

import { HeroSection } from '@/components/hero-section';
import { useGridScanConfig } from '@/hooks/useGridScanConfig';
import { GridScan } from '../components/backgrounds/grid-scan';

export default function Home() {
	const gridConfig = useGridScanConfig();

	return (
		<>
			<div className='relative min-h-screen w-full'>
				<div className='absolute inset-0 pointer-events-none'>
					<GridScan
						{...gridConfig}
						className='w-full h-full pointer-events-auto'
					/>
				</div>
				<HeroSection />
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
