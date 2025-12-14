'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageRevealProps {
	children: React.ReactNode;
	delay?: number;
}

export function PageReveal({ children, delay = 1.2 }: PageRevealProps) {
	const [isRevealing, setIsRevealing] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsRevealing(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<div className='relative'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isRevealing ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>

			<motion.div
				className='fixed inset-0 z-40 bg-white dark:bg-zinc-950'
				initial={{ x: 0 }}
				animate={{ x: isRevealing ? '100%' : 0 }}
				transition={{
					duration: 0.8,
					delay: 0.1,
					ease: [0.43, 0.13, 0.23, 0.96],
				}}
				style={{
					pointerEvents: isRevealing ? 'none' : 'auto',
				}}
			/>
		</div>
	);
}
