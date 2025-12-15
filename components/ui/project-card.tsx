'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../sections/projects-showcase';

interface ProjectCardProps {
	project: Project;
	isHovered: boolean;
	onHover: (id: string | null) => void;
}

function ProjectCard({ project, isHovered, onHover }: ProjectCardProps) {
	const isCurrentHovered = isHovered;
	const maxStackDisplay = 3;
	const displayedStack = project.stack.slice(0, maxStackDisplay);
	const remainingCount = project.stack.length - maxStackDisplay;

	return (
		<Link href={`/projects/${project.slug}`}>
			<motion.div
				onHoverStart={() => onHover(project.id)}
				onHoverEnd={() => onHover(null)}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={cn(
					'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800',
					'bg-white dark:bg-zinc-950 backdrop-blur-sm',
					'transition-all duration-300 ease-out',
					'hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-zinc-900/50',
					'hover:border-slate-300 dark:hover:border-zinc-700',
					'h-full cursor-pointer',
					!isCurrentHovered && 'opacity-40'
				)}
			>
				<div className='relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-900'>
					{project.mediaType === 'video' ? (
						<video
							src={project.media}
							className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
							autoPlay
							loop
							muted
							playsInline
						/>
					) : (
						<Image
							src={project.media}
							alt={project.name}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105'
							sizes='(max-width: 768px) 100vw, 50vw'
						/>
					)}
				</div>

				<div className='flex flex-1 flex-col gap-4 p-6'>
					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-bold text-slate-900 dark:text-gray-100'>
							{project.name}
						</h3>
						<p className='text-sm text-slate-600 dark:text-gray-400 leading-relaxed'>
							{project.description}
						</p>
					</div>

					<div className='flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800'>
						{displayedStack.map((tech, index) => (
							<div
								key={index}
								className='flex items-center gap-1.5 text-slate-700 dark:text-zinc-300 group/tech'
								title={tech.name}
							>
								<span className='text-lg transition-transform duration-200 group-hover/tech:scale-110'>
									{tech.icon}
								</span>
								<span className='text-xs font-medium'>{tech.name}</span>
							</div>
						))}
						{remainingCount > 0 && (
							<div
								className='flex items-center text-slate-700 dark:text-zinc-300'
								title={`${remainingCount} more ${
									remainingCount === 1 ? 'technology' : 'technologies'
								}`}
							>
								<span className='text-xs font-semibold'>+{remainingCount}</span>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</Link>
	);
}

export { ProjectCard };
