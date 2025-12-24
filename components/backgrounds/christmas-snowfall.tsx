'use client';

import { useTheme } from 'next-themes';
import Snowfall from 'react-snowfall';

export function ChristmasSnowfall() {
	const { resolvedTheme } = useTheme();
	const effectiveTheme = resolvedTheme || 'dark';

	if (process.env.NEXT_PUBLIC_ENABLE_CHRISTMAS !== 'true') {
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
}
