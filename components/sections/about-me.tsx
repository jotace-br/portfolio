'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import ShinyText from '../animations/shiny-text';
import ScrollReveal from '../text-animations/scroll-reveal';

function AboutMe() {
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
							text='About Me'
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
							I&apos;m Júlio César, a front-end engineer with over 5+ years of
							experience building web applications for real-world use. I focus
							on writing clean, reliable code and contributing to products that
							evolve over time.
						</ScrollReveal>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

export { AboutMe };
