'use client';

import ShinyText from '@/components/animations/shiny-text';
import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProjectOverviewProps {
	overview: string;
}

export function ProjectOverview({ overview }: ProjectOverviewProps) {
	const locale = useLocale();

	const labels = {
		en: { section: 'The Project', title: 'Overview' },
		pt: { section: 'O Projeto', title: 'Visão Geral' },
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
				<motion.p
					className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed'
					variants={itemVariants}
				>
					{overview}
				</motion.p>
			</div>
		</motion.section>
	);
}
