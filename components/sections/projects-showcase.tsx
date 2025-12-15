'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { PROJECTS } from '@/constants/projects';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { ReactNode, useState } from 'react';
import ShinyText from '../animations/shiny-text';
import { Button } from '../ui/button';
import { ProjectCard } from '../ui/project-card';

export interface Project {
	id: string;
	slug: string;
	name: string;
	description: string;
	overview: string;
	date: string;
	stack: { name: string; icon: ReactNode }[];
	keyFeatures: string[];
	decisions: string[];
	impact: string[];
	media: string;
	banner: string;
	mediaType: 'image' | 'video';
	liveUrl?: string;
	githubUrl?: string;
}

const INITIAL_ITEMS_TO_SHOW = 4;

function ProjectsShowcase() {
	const [showAll, setShowAll] = useState(false);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const displayedProjects = showAll
		? PROJECTS
		: PROJECTS.slice(0, INITIAL_ITEMS_TO_SHOW);
	const hasMore = PROJECTS.length > INITIAL_ITEMS_TO_SHOW;

	return (
		<section
			id='projects'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='projects-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-8 sm:gap-12'
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
									text='My Projects'
									className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
								/>
							</motion.div>

							<motion.h2
								id='projects-heading'
								className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
								variants={itemVariants}
							>
								Checkout out my latest projects
							</motion.h2>
						</motion.div>
						<motion.p
							className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed max-w-3xl'
							variants={itemVariants}
						>
							I&apos;ve worked on production systems in close collaboration with
							product, design, and engineering teams. My approach prioritizes
							clarity, long-term maintainability, and decisions that scale with
							the product.
						</motion.p>
					</div>

					<motion.div
						className='flex w-full flex-col items-center gap-6'
						variants={itemVariants}
					>
						<motion.div
							className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full'
							variants={containerVariants}
							initial='hidden'
							animate='visible'
						>
							<AnimatePresence mode='popLayout'>
								{displayedProjects.map((project, index) => (
									<motion.div
										key={project.id}
										initial={{ scale: 0.8, opacity: 0, y: 20 }}
										animate={{ scale: 1, opacity: 1, y: 0 }}
										exit={{ scale: 1, opacity: 0, y: 0 }}
										transition={{
											duration: 0.3,
											delay:
												index >= INITIAL_ITEMS_TO_SHOW
													? (index - INITIAL_ITEMS_TO_SHOW) * 0.1
													: 0,
											ease: [0.32, 0.72, 0, 1],
										}}
									>
										<ProjectCard
											project={project}
											isHovered={hoveredId === null || hoveredId === project.id}
											onHover={setHoveredId}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>

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

export { ProjectsShowcase };
