import { PageReveal } from '@/components/animations/page-reveal';
import { PROJECTS } from '@/constants/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectBanner } from './assets/project-banner';
import { ProjectDecisions } from './assets/project-decisions';
import { ProjectFeatures } from './assets/project-features';
import { ProjectHeader } from './assets/project-header';
import { ProjectImpact } from './assets/project-impact';
import { ProjectOverview } from './assets/project-overview';
import { ProjectPreview } from './assets/project-preview';

interface ProjectPageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = PROJECTS.find((p) => p.slug === slug);

	if (!project) {
		return {
			title: 'Project Not Found',
			description: 'The requested project could not be found.',
		};
	}

	return {
		title: `${project.name} | Projects`,
		description: project.description,
		openGraph: {
			title: project.name,
			description: project.description,
			images: [project.banner],
			type: 'article',
			publishedTime: project.date,
		},
		twitter: {
			card: 'summary_large_image',
			title: project.name,
			description: project.description,
			images: [project.banner],
		},
	};
}

export function generateStaticParams() {
	return PROJECTS.map((project) => ({
		slug: project.slug,
	}));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;

	const project = PROJECTS.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<PageReveal delay={0.5}>
			<div className='w-full min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 pb-14'>
				<ProjectBanner
					banner={project.banner}
					name={project.name}
					liveUrl={project.liveUrl}
					githubUrl={project.githubUrl}
				/>

				<ProjectHeader
					date={project.date}
					name={project.name}
					description={project.description}
					stack={project.stack}
				/>

				<ProjectOverview overview={project.overview} />

				<ProjectPreview
					media={project.media}
					mediaType={project.mediaType}
					name={project.name}
				/>

				<ProjectFeatures features={project.keyFeatures} />

				<ProjectDecisions decisions={project.decisions} />

				<ProjectImpact impact={project.impact} />
			</div>
		</PageReveal>
	);
}
