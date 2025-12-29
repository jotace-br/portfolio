import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface ProjectTechStackProps {
	stack: { name: string; icon: ReactNode }[];
}

export function ProjectTechStack({ stack }: ProjectTechStackProps) {
	return (
		<div className='flex flex-wrap gap-2'>
			{stack.map((tech, index) => (
				<Badge
					key={index}
					variant='secondary'
					className='flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 hover:bg-white/70 dark:hover:bg-zinc-900/70'
				>
					<span className='text-base'>{tech.icon}</span>
					<span>{tech.name}</span>
				</Badge>
			))}
		</div>
	);
}
