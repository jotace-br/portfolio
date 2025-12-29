import { PageReveal } from '@/components/animations/page-reveal';
import { PROJECTS, ProjectData } from '@/constants/projects';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/utils/url';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProjectBanner } from './assets/project-banner';
import { ProjectDecisions } from './assets/project-decisions';
import { ProjectFeatures } from './assets/project-features';
import { ProjectHeader } from './assets/project-header';
import { ProjectImpact } from './assets/project-impact';
import { ProjectOverview } from './assets/project-overview';
import { ProjectPreview } from './assets/project-preview';

interface ProjectPageProps {
	params: Promise<{
		locale: string;
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const project = PROJECTS.find((p) => p.slug === slug);
	const baseUrl = getBaseUrl();
	const canonicalUrl = `${baseUrl}/${locale}/projects/${slug}`;
	const t = await getTranslations({ locale, namespace: 'projects' });

	if (!project) {
		return {
			title: 'Project Not Found',
			description: 'The requested project could not be found.',
			alternates: {
				canonical: canonicalUrl,
			},
		};
	}

	const name = t(`items.${slug}.name`);
	const description = t(`items.${slug}.description`);

	return {
		title: `${name} | Projects`,
		description: description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				en: `${baseUrl}/en/projects/${slug}`,
				pt: `${baseUrl}/pt/projects/${slug}`,
			},
		},
		openGraph: {
			title: name,
			description: description,
			images: [project.banner],
			type: 'article',
			publishedTime: project.date,
			url: canonicalUrl,
		},
		twitter: {
			card: 'summary_large_image',
			title: name,
			description: description,
			images: [project.banner],
		},
	};
}

export function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		PROJECTS.map((project) => ({
			locale,
			slug: project.slug,
		}))
	);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { locale, slug } = await params;

	setRequestLocale(locale);

	const project = PROJECTS.find((p: ProjectData) => p.slug === slug);

	if (!project) {
		notFound();
	}

	const t = await getTranslations({ locale, namespace: 'projects' });

	const name = t(`items.${slug}.name`);
	const description = t(`items.${slug}.description`);
	const overview = t(`items.${slug}.overview`);
	const keyFeatures = t.raw(`items.${slug}.keyFeatures`) as string[];
	const decisions = t.raw(`items.${slug}.decisions`) as string[];
	const impact = t.raw(`items.${slug}.impact`) as string[];

	return (
		<PageReveal delay={0.5}>
			<div className='w-full min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 pb-14'>
				<ProjectBanner
					banner={project.banner}
					name={name}
					liveUrl={project.liveUrl}
					githubUrl={project.githubUrl}
				/>

				<ProjectHeader
					date={project.date}
					name={name}
					description={description}
					stack={project.stack}
				/>

				<ProjectOverview overview={overview} />

				<ProjectPreview
					media={project.media}
					mediaType={project.mediaType}
					name={name}
				/>

				<ProjectFeatures features={keyFeatures} />
				<ProjectDecisions decisions={decisions} />
				<ProjectImpact impact={impact} />
			</div>
		</PageReveal>
	);
}
