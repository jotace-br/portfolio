'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageRevealProps {
	children: React.ReactNode;
	delay?: number;
}

export function PageReveal({ children, delay = 1.2 }: PageRevealProps) {
	const [isRevealing, setIsRevealing] = useState(delay === 0);

	useEffect(() => {
		if (delay === 0) return;

		const timer = setTimeout(() => {
			setIsRevealing(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [delay]);

	if (delay === 0) {
		return <>{children}</>;
	}

	return (
		<div className='relative'>
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>

			<motion.div
				className='fixed inset-0 z-40 bg-white dark:bg-zinc-950'
				initial={{ x: 0 }}
				animate={{ x: isRevealing ? '100%' : 0 }}
				transition={{
					duration: 0.6,
					ease: [0.43, 0.13, 0.23, 0.96],
				}}
				style={{
					pointerEvents: isRevealing ? 'none' : 'auto',
				}}
			/>
		</div>
	);
}
