'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { EDUCATION_EXPERIENCES } from '@/constants/education';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useState } from 'react';
import ShinyText from '../animations/shiny-text';
import { Accordion, ExpandableAccordionDetails } from '../ui/accordion';
import { Button } from '../ui/button';

const INITIAL_ITEMS_TO_SHOW = 4;

function Education() {
	const [showAll, setShowAll] = useState(false);

	const displayedEducationExperiences = showAll
		? EDUCATION_EXPERIENCES
		: EDUCATION_EXPERIENCES.slice(0, INITIAL_ITEMS_TO_SHOW);
	const hasMore = EDUCATION_EXPERIENCES.length > INITIAL_ITEMS_TO_SHOW;

	return (
		<section
			id='education'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='education-heading'
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
									text='Education'
									className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
								/>
							</motion.div>

							<motion.h2
								id='about-heading'
								className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
								variants={itemVariants}
							>
								Educational Background
							</motion.h2>
						</motion.div>

						<motion.p
							className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed'
							variants={itemVariants}
						>
							My academic background provided a strong foundation in software
							development concepts, problem-solving, and structured thinking,
							supporting my professional growth as an engineer.
						</motion.p>
					</div>

					<motion.div
						className='flex w-full flex-col items-center gap-4'
						variants={itemVariants}
					>
						<Accordion type='single' collapsible className='w-full'>
							<AnimatePresence mode='popLayout'>
								{displayedEducationExperiences.map((education, index) => (
									<motion.div
										key={education.id}
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
								{showAll ? 'Show Less' : 'Show More'}
							</Button>
						)}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

export { Education };
