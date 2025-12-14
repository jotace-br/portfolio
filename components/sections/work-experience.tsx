'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { JOB_EXPERIENCES } from '@/constants/job-experiences';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ShinyText from '../animations/shiny-text';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';
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
	const [showAll, setShowAll] = useState(false);
	const displayedJobs = showAll
		? JOB_EXPERIENCES
		: JOB_EXPERIENCES.slice(0, INITIAL_ITEMS_TO_SHOW);
	const hasMore = JOB_EXPERIENCES.length > INITIAL_ITEMS_TO_SHOW;

	return (
		<section
			id='work'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='work-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-8 sm:gap-12 sm:flex-row'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<div
						className={cn(
							'flex flex-col gap-6 sm:pr-4 sm:w-2/5 lg:w-2/3',
							'sm:sticky sm:top-28 sm:self-start'
						)}
					>
						<motion.div className='flex flex-col gap-2' variants={itemVariants}>
							<motion.div
								className='flex w-fit items-center gap-2 text-highlight-primary'
								variants={itemVariants}
							>
								<Sparkle size={16} />
								<ShinyText
									text='Work History'
									className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
								/>
							</motion.div>

							<motion.h2
								id='about-heading'
								className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
								variants={itemVariants}
							>
								Experience
							</motion.h2>
						</motion.div>

						<motion.p
							className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed'
							variants={itemVariants}
						>
							I&apos;ve worked on production systems in close collaboration with
							product, design, and engineering teams. My approach prioritizes
							clarity, long-term maintainability, and decisions that scale with
							the product.
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
										<AccordionItem value={job.id} className='px-4'>
											<AccordionTrigger className='hover:no-underline'>
												<div className='flex items-center gap-4 w-full'>
													<div className='relative size-14 rounded-lg overflow-hidden shrink-0'>
														<Image
															src={job.logo}
															alt={`${job.company} logo`}
															fill
															quality={100}
															className='object-contain'
														/>
													</div>
													<div className='flex flex-col items-start text-left flex-1 min-w-0'>
														<h3 className='font-semibold text-slate-900 dark:text-gray-100 truncate w-full'>
															{job.role}
														</h3>
														<Link
															href={job.companyLink}
															target='_blank'
															rel='noopener noreferrer'
															className='text-sm text-slate-600 dark:text-gray-400 truncate hover:underline w-fit'
														>
															{job.company}
														</Link>
														<p className='text-xs text-slate-500 dark:text-gray-500'>
															{job.period}
														</p>
													</div>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<ul className='space-y-2 mt-4 list-disc list-inside'>
													{job.achievements.map((achievement, index) => (
														<li
															key={index}
															className='text-sm text-gray-900 dark:text-gray-400 marker:text-slate-900 dark:marker:text-gray-400'
														>
															{achievement}
														</li>
													))}
												</ul>
											</AccordionContent>
										</AccordionItem>
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

export { WorkExperience };
