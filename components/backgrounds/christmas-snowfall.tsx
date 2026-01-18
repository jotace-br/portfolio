'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from 'next-themes';
import { memo } from 'react';
import Snowfall from 'react-snowfall';

export const ChristmasSnowfall = memo(function ChristmasSnowfall() {
	const { resolvedTheme } = useTheme();
	const { shouldReduceMotion } = useReducedMotion();
	const effectiveTheme = resolvedTheme || 'dark';

	// Don't render snowfall for reduced motion preference or when disabled
	if (
		process.env.NEXT_PUBLIC_ENABLE_CHRISTMAS !== 'true' ||
		shouldReduceMotion
	) {
		return null;
	}

	const snowColor = effectiveTheme === 'dark' ? '#dee4fd' : '#a5b4fc';

	return (
		<Snowfall
			color={snowColor}
			snowflakeCount={50}
			style={{
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				zIndex: 9999,
				pointerEvents: 'none',
			}}
		/>
	);
});
