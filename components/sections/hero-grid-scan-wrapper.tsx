'use client';

import { useGridScanConfig } from '@/hooks/use-grid-scan-config';
import { GridScan } from '../backgrounds/grid-scan';

export function HeroGridScanWrapper() {
	const gridConfig = useGridScanConfig();

	return (
		<div className='absolute inset-0 pointer-events-none'>
			<GridScan {...gridConfig} className='w-full h-full pointer-events-auto' />
		</div>
	);
}
