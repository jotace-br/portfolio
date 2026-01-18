'use client';

import { getAnimationVariants } from '@/constants/animations';
import { EDUCATION_EXPERIENCES, EducationData } from '@/constants/education';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo, useState } from 'react';
import ShinyText from '../animations/shiny-text';
import { Accordion, ExpandableAccordionDetails } from '../ui/accordion';
import { Button } from '../ui/button';
import { JobExperience } from './work-experience';

const INITIAL_ITEMS_TO_SHOW = 4;

const Education = memo(function Education() {
	const t = useTranslations('education');
	const tEducation = useTranslations('educationItems');
	const [showAll, setShowAll] = useState(false);
	const { shouldReduceMotion } = useReducedMotion();
	const { container, item } = getAnimationVariants(shouldReduceMotion);

	// Merge static data with translations
	const educationExperiences: JobExperience[] = useMemo(() => {
		return EDUCATION_EXPERIENCES.map((edu: EducationData) => ({
			id: edu.id,
			company: edu.company,
			companyLink: edu.companyLink,
			logo: edu.logo,
			role: tEducation(`${edu.translationKey}.role`),
			period: tEducation(`${edu.translationKey}.period`),
			achievements: tEducation.raw(
				`${edu.translationKey}.achievements`
			) as string[],
		}));
	}, [tEducation]);

	const displayedEducationExperiences = showAll
		? educationExperiences
		: educationExperiences.slice(0, INITIAL_ITEMS_TO_SHOW);
	const hasMore = educationExperiences.length > INITIAL_ITEMS_TO_SHOW;

	// Reduced motion item animation variants
	const listItemVariants = shouldReduceMotion
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
		  }
		: {
				initial: { scale: 0.8, opacity: 0, y: 20 },
				animate: { scale: 1, opacity: 1, y: 0 },
				exit: { scale: 0.8, opacity: 0, y: -20 },
		  };

	return (
		<section
			id='education'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='education-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-8 md:gap-12 md:flex-row'
					variants={container}
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
						<motion.div className='flex flex-col gap-2' variants={item}>
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

							<motion.h2
								id='education-heading'
								className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
								variants={item}
							>
								{t('title')}
							</motion.h2>
						</motion.div>

						<motion.p
							className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed'
							variants={item}
						>
							{t('description')}
						</motion.p>
					</div>

					<motion.div
						className='flex w-full flex-col items-center gap-4'
						variants={item}
					>
						<Accordion type='single' collapsible className='w-full'>
							<AnimatePresence mode='popLayout'>
								{displayedEducationExperiences.map((education, index) => (
									<motion.div
										key={education.id}
										{...listItemVariants}
										transition={
											shouldReduceMotion
												? { duration: 0.01 }
												: {
														duration: 0.3,
														delay:
															index >= INITIAL_ITEMS_TO_SHOW
																? (index - INITIAL_ITEMS_TO_SHOW) * 0.1
																: 0,
														ease: [0.32, 0.72, 0, 1],
												  }
										}
									>
										<ExpandableAccordionDetails item={education} />
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
								{showAll ? t('showLess') : t('showMore')}
							</Button>
						)}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
});

export { Education };
