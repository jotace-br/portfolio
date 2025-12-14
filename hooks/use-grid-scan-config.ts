import { GridScanProps } from '@/types/grid-scan';
import { useTheme } from 'next-themes';

export function useGridScanConfig(): Omit<GridScanProps, 'className'> {
	const { resolvedTheme } = useTheme();

	const darkConfig = {
		sensitivity: 0.55,
		lineThickness: 1,
		linesColor: '#392e4e',
		gridScale: 0.07,
		scanColor: '#FF9FFC',
		scanOpacity: 0.4,
		enablePost: true,
		enableGyro: true,
		bloomIntensity: 0.6,
		scanSoftness: 2.9,
		chromaticAberration: 0.003,
		noiseIntensity: 0.01,
	};

	const lightConfig = {
		sensitivity: 0.27,
		lineThickness: 1.2,
		linesColor: '#94a3b8',
		gridScale: 0.07,
		scanColor: '#c182f5',
		scanOpacity: 0.5,
		enablePost: true,
		enableGyro: true,
		bloomIntensity: 0.3,
		scanSoftness: 2.9,
		chromaticAberration: 0.001,
		noiseIntensity: 0.02,
	};

	return resolvedTheme === 'dark' ? darkConfig : lightConfig;
}
