'use client';

import ShinyText from '@/components/animations/shiny-text';
import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Check, Sparkle } from 'lucide-react';

interface ProjectFeaturesProps {
	features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
	return (
		<motion.section
			className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12'
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.15 }}
		>
			<div className='flex flex-col gap-6'>
				<motion.div className='flex flex-col gap-2' variants={itemVariants}>
					<motion.div
						className='flex w-fit items-center gap-2 text-highlight-primary'
						variants={itemVariants}
					>
						<Sparkle size={16} />
						<ShinyText
							text='What Makes It Special'
							className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
						/>
					</motion.div>

					<motion.h2
						className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
						variants={itemVariants}
					>
						Key Features
					</motion.h2>
				</motion.div>
				<motion.ul
					className='grid grid-cols-1 md:grid-cols-2 gap-4'
					variants={itemVariants}
				>
					{features.map((feature, index) => (
						<li
							key={index}
							className='flex items-start gap-3 text-slate-700 dark:text-gray-300'
						>
							<div className='shrink-0 mt-1'>
								<div className='flex items-center justify-center w-5 h-5 rounded-full bg-green-500/10 dark:bg-green-500/20'>
									<Check
										size={14}
										className='text-green-600 dark:text-green-400'
									/>
								</div>
							</div>
							<span className='text-base font-medium leading-relaxed'>
								{feature}
							</span>
						</li>
					))}
				</motion.ul>
			</div>
		</motion.section>
	);
}
