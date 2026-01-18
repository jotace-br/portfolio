'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import {
	motion,
	MotionValue,
	Transition,
	useAnimation,
	useMotionValue,
} from 'motion/react';
import React, { memo, useEffect } from 'react';

interface CircularTextProps {
	text: string;
	spinDuration?: number;
	onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
	className?: string;
	children?: React.ReactNode;
}

const getRotationTransition = (
	duration: number,
	from: number,
	loop: boolean = true
) => ({
	from,
	to: from + 360,
	ease: 'linear' as const,
	duration,
	type: 'tween' as const,
	repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
	rotate: getRotationTransition(duration, from),
	scale: {
		type: 'spring' as const,
		damping: 20,
		stiffness: 300,
	},
});

const CircularText: React.FC<CircularTextProps> = memo(function CircularText({
	text,
	spinDuration = 20,
	onHover = 'speedUp',
	className = '',
	children,
}) {
	const { shouldReduceMotion } = useReducedMotion();
	const letters = Array.from(text);
	const controls = useAnimation();
	const rotation: MotionValue<number> = useMotionValue(0);

	useEffect(() => {
		// Skip animation for reduced motion preference
		if (shouldReduceMotion) return;

		const start = rotation.get();
		controls.start({
			rotate: start + 360,
			scale: 1,
			transition: getTransition(spinDuration, start),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spinDuration, text, onHover, controls, shouldReduceMotion]);

	const handleHoverStart = () => {
		// Skip hover animations for reduced motion preference
		if (shouldReduceMotion) return;

		const start = rotation.get();

		if (!onHover) return;

		let transitionConfig: ReturnType<typeof getTransition> | Transition;
		let scaleVal = 1;

		switch (onHover) {
			case 'slowDown':
				transitionConfig = getTransition(spinDuration * 2, start);
				break;
			case 'speedUp':
				transitionConfig = getTransition(spinDuration / 4, start);
				break;
			case 'pause':
				transitionConfig = {
					rotate: { type: 'spring', damping: 20, stiffness: 300 },
					scale: { type: 'spring', damping: 20, stiffness: 300 },
				};
				break;
			case 'goBonkers':
				transitionConfig = getTransition(spinDuration / 20, start);
				scaleVal = 0.8;
				break;
			default:
				transitionConfig = getTransition(spinDuration, start);
		}

		controls.start({
			rotate: start + 360,
			scale: scaleVal,
			transition: transitionConfig,
		});
	};

	const handleHoverEnd = () => {
		// Skip hover animations for reduced motion preference
		if (shouldReduceMotion) return;
		const start = rotation.get();
		controls.start({
			rotate: start + 360,
			scale: 1,
			transition: getTransition(spinDuration, start),
		});
	};

	return (
		<div className='relative group'>
			<motion.div
				className={cn(
					'm-0 mx-auto rounded-full w-50 h-50 relative font-black text-white text-center cursor-pointer origin-center',
					'bg-gray-200/80 dark:bg-gray-800/5 backdrop-blur-md',
					'border-2 border-gray-200/50 dark:border-gray-700/50',
					'shadow-lg',
					className
				)}
				style={{ rotate: shouldReduceMotion ? 0 : rotation }}
				initial={{ rotate: 0 }}
				animate={shouldReduceMotion ? undefined : controls}
				onMouseEnter={handleHoverStart}
				onMouseLeave={handleHoverEnd}
			>
				{letters.map((letter, i) => {
					const rotationDeg = (360 / letters.length) * i;
					const factor = Math.PI / letters.length;
					const x = factor * i;
					const y = factor * i;
					const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

					return (
						<span
							key={i}
							className='absolute inline-block inset-0 text-sm sm:text-base md:text-xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] motion-reduce:transition-none'
							style={{ transform, WebkitTransform: transform }}
						>
							{letter}
						</span>
					);
				})}
			</motion.div>
			{children && (
				<div className='absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:rotate-135 motion-reduce:transition-none motion-reduce:group-hover:rotate-0'>
					{children}
				</div>
			)}
		</div>
	);
});

export default CircularText;
