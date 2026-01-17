export type GridScanProps = {
	sensitivity?: number;

	lineThickness?: number;
	linesColor?: string;

	gridScale?: number;
	lineStyle?: 'solid' | 'dashed' | 'dotted';
	lineJitter?: number;

	enablePost?: boolean;
	bloomIntensity?: number;
	bloomThreshold?: number;
	bloomSmoothing?: number;
	chromaticAberration?: number;
	noiseIntensity?: number;

	scanColor?: string;
	scanOpacity?: number;
	scanDirection?: 'forward' | 'backward' | 'pingpong';
	scanSoftness?: number;
	scanGlow?: number;
	scanPhaseTaper?: number;
	scanDuration?: number;
	scanDelay?: number;
	enableGyro?: boolean;
	scanOnClick?: boolean;
	snapBackDelay?: number;
	className?: string;
	style?: React.CSSProperties;
};
