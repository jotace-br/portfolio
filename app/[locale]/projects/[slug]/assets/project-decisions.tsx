'use client';

import ShinyText from '@/components/animations/shiny-text';
import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkle } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProjectDecisionsProps {
	decisions: string[];
}

export function ProjectDecisions({ decisions }: ProjectDecisionsProps) {
	const locale = useLocale();

	const labels = {
		en: { section: 'Technical Choices', title: 'Key Decisions' },
		pt: { section: 'Escolhas Técnicas', title: 'Decisões-Chave' },
	};

	const { section, title } = labels[locale as keyof typeof labels] || labels.en;

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
							text={section}
							className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
						/>
					</motion.div>

					<motion.h2
						className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
						variants={itemVariants}
					>
						{title}
					</motion.h2>
				</motion.div>
				<motion.ul
					className='grid grid-cols-1 md:grid-cols-2 gap-4'
					variants={itemVariants}
				>
					{decisions.map((decision, index) => (
						<li
							key={index}
							className='flex items-start gap-3 text-slate-700 dark:text-gray-300'
						>
							<div className='shrink-0 mt-1'>
								<div className='flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 dark:bg-blue-500/20'>
									<Lightbulb
										size={14}
										className='text-blue-600 dark:text-blue-400'
									/>
								</div>
							</div>
							<span className='text-base font-medium leading-relaxed'>
								{decision}
							</span>
						</li>
					))}
				</motion.ul>
			</div>
		</motion.section>
	);
}
