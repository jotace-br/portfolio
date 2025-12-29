'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ShinyText from '../animations/shiny-text';
import ScrollReveal from '../text-animations/scroll-reveal';

function AboutMe() {
	const t = useTranslations('about');

	return (
		<section
			id='about'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='about-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-4 items-center text-center'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<motion.div
						className='flex w-fit items-center gap-2 text-highlight-primary'
						variants={itemVariants}
					>
						<Sparkle size={16} />
						<ShinyText
							text={t('label')}
							className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
						/>
					</motion.div>

					<motion.div variants={itemVariants}>
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
}

export { AboutMe };
