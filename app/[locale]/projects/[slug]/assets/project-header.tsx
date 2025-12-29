'use client';

import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';
import { ProjectTechStack } from './project-tech-stack';

interface ProjectHeaderProps {
	date: string;
	name: string;
	description: string;
	stack: { name: string; icon: React.ReactNode }[];
}

export function ProjectHeader({
	date,
	name,
	description,
	stack,
}: ProjectHeaderProps) {
	const locale = useLocale();

	const formattedDate = new Date(date).toLocaleDateString(
		locale === 'pt' ? 'pt-BR' : 'en-US',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	);

	const backText =
		locale === 'pt' ? 'Voltar para Projetos' : 'Back to Projects';

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
			<div className='flex justify-between items-center gap-4 mb-8'>
				<Link
					href='/#projects'
					className='inline-flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors group'
				>
					<ArrowLeft
						size={16}
						className='transition-transform group-hover:-translate-x-1'
					/>
					{backText}
				</Link>

				<time
					dateTime={date}
					className='text-sm text-slate-600 dark:text-zinc-400 font-medium'
				>
					{formattedDate}
				</time>
			</div>

			<div className='flex flex-col gap-4'>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight'>
					{name}
				</h1>
				<p className='text-lg sm:text-xl text-slate-700 dark:text-zinc-400 leading-relaxed'>
					{description}
				</p>

				<ProjectTechStack stack={stack} />
			</div>
		</div>
	);
}
