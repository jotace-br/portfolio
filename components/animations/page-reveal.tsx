'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

interface PageRevealProps {
	children: React.ReactNode;
	delay?: number;
}

export const PageReveal = memo(function PageReveal({
	children,
	delay = 1.2,
}: PageRevealProps) {
	const { shouldReduceMotion } = useReducedMotion();
	const [isRevealing, setIsRevealing] = useState(
		delay === 0 || shouldReduceMotion
	);

	useEffect(() => {
		if (delay === 0 || shouldReduceMotion) {
			const id = setTimeout(() => {
				setIsRevealing(true);
			}, 0);

			return () => clearTimeout(id);
		}

		const timer = setTimeout(() => {
			setIsRevealing(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [delay, shouldReduceMotion]);

	if (delay === 0 || shouldReduceMotion) {
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
});
