'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import {
	JOB_EXPERIENCES,
	JobExperienceData,
} from '@/constants/job-experiences';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import ShinyText from '../animations/shiny-text';
import { Accordion, ExpandableAccordionDetails } from '../ui/accordion';
import { Button } from '../ui/button';

export interface JobExperience {
	id: string;
	company: string;
	companyLink: string;
	logo: string;
	role: string;
	period: string;
	achievements: string[];
}

const INITIAL_ITEMS_TO_SHOW = 4;

function WorkExperience() {
	const t = useTranslations('work');
	const tJobs = useTranslations('jobs');
	const [showAll, setShowAll] = useState(false);

	// Merge static data with translations
	const jobExperiences: JobExperience[] = useMemo(() => {
		return JOB_EXPERIENCES.map((job: JobExperienceData) => ({
			id: job.id,
			company: job.company,
			companyLink: job.companyLink,
			logo: job.logo,
			role: tJobs(`${job.translationKey}.role`),
			period: tJobs(`${job.translationKey}.period`),
			achievements: tJobs.raw(`${job.translationKey}.achievements`) as string[],
		}));
	}, [tJobs]);

	const displayedJobs = showAll
		? jobExperiences
		: jobExperiences.slice(0, INITIAL_ITEMS_TO_SHOW);
	const hasMore = jobExperiences.length > INITIAL_ITEMS_TO_SHOW;
	const remainingCount = jobExperiences.length - INITIAL_ITEMS_TO_SHOW;

	return (
		<section
			id='work'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='work-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-8 md:gap-12 md:flex-row'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<div
						className={cn(
							'flex flex-col gap-6 md:pr-4 md:w-2/5 lg:w-2/3',
							'md:sticky md:top-28 md:self-start'
						)}
					>
						<motion.div className='flex flex-col gap-2' variants={itemVariants}>
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

							<motion.h2
								id='work-heading'
								className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
								variants={itemVariants}
							>
								{t('title')}
							</motion.h2>
						</motion.div>

						<motion.p
							className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed'
							variants={itemVariants}
						>
							{t('description')}
						</motion.p>
					</div>

					<motion.div
						className='flex w-full flex-col items-center gap-4'
						variants={itemVariants}
					>
						<Accordion type='single' collapsible className='w-full'>
							<AnimatePresence mode='popLayout'>
								{displayedJobs.map((job, index) => (
									<motion.div
										key={job.id}
										initial={{ scale: 0.8, opacity: 0, y: 20 }}
										animate={{ scale: 1, opacity: 1, y: 0 }}
										exit={{ scale: 0.8, opacity: 0, y: -20 }}
										transition={{
											duration: 0.3,
											delay:
												index >= INITIAL_ITEMS_TO_SHOW
													? (index - INITIAL_ITEMS_TO_SHOW) * 0.1
													: 0,
											ease: [0.32, 0.72, 0, 1],
										}}
									>
										<ExpandableAccordionDetails item={job} />
									</motion.div>
								))}
							</AnimatePresence>
						</Accordion>

						{hasMore && (
							<Button
								variant='ghost'
								onClick={() => setShowAll(!showAll)}
								className='w-fit'
							>
								{showAll
									? t('showLess')
									: t('showMore', { count: remainingCount })}
							</Button>
						)}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

export { WorkExperience };
