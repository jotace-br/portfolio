'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Project } from '../sections/projects-showcase';

interface ProjectCardProps {
	project: Project;
	isHovered: boolean;
	onHover: (id: string | null) => void;
}

const ProjectCard = memo(function ProjectCard({
	project,
	isHovered,
	onHover,
}: ProjectCardProps) {
	const { shouldReduceMotion } = useReducedMotion();
	const isCurrentHovered = isHovered;
	const maxStackDisplay = 3;

	// Memoize derived data
	const { displayedStack, remainingCount } = useMemo(
		() => ({
			displayedStack: project.stack.slice(0, maxStackDisplay),
			remainingCount: project.stack.length - maxStackDisplay,
		}),
		[project.stack]
	);

	return (
		<Link href={`/projects/${project.slug}`}>
			<motion.div
				onHoverStart={() => onHover(project.id)}
				onHoverEnd={() => onHover(null)}
				initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={shouldReduceMotion ? { duration: 0.01 } : undefined}
				className={cn(
					'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800',
					'bg-white dark:bg-zinc-950 backdrop-blur-sm',
					'transition-all duration-300 ease-out motion-reduce:transition-none',
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
							className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100'
							autoPlay={!shouldReduceMotion}
							loop
							muted
							playsInline
						/>
					) : (
						<Image
							src={project.media}
							alt={project.name}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100'
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
								<span className='text-lg transition-transform duration-200 group-hover/tech:scale-110 motion-reduce:transition-none motion-reduce:group-hover/tech:scale-100'>
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
});

export { ProjectCard };
