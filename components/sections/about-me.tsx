'use client';

import { getAnimationVariants } from '@/constants/animations';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import ShinyText from '../animations/shiny-text';
import ScrollReveal from '../text-animations/scroll-reveal';

const AboutMe = memo(function AboutMe() {
	const t = useTranslations('about');
	const { shouldReduceMotion } = useReducedMotion();
	const { container, item } = getAnimationVariants(shouldReduceMotion);

	return (
		<section
			id='about'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='about-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-4 items-center text-center'
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<motion.div
						className='flex w-fit items-center gap-2 text-highlight-primary'
						variants={item}
					>
						<Sparkle size={16} />
						<ShinyText
							text={t('label')}
							className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
						/>
					</motion.div>

					<motion.div variants={item}>
						<ScrollReveal
							enableBlur={false}
							baseRotation={0}
							rotationEnd='center center'
							wordAnimationEnd='center top'
						>
							{t('content')}
						</ScrollReveal>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
});

export { AboutMe };
