import { PageReveal } from '@/components/animations/page-reveal';
import { AllTechnologiesLoop } from '@/components/sections/all-technologies-loop';
import { HeroSectionWithGridScan } from '@/components/sections/hero-section-with-grid-scan';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold sections to reduce initial bundle and improve FCP/LCP
const AboutMe = dynamic(
	() => import('@/components/sections/about-me').then((mod) => mod.AboutMe),
	{ ssr: true }
);

const WorkExperience = dynamic(
	() =>
		import('@/components/sections/work-experience').then(
			(mod) => mod.WorkExperience
		),
	{ ssr: true }
);

const ProjectsShowcase = dynamic(
	() =>
		import('@/components/sections/projects-showcase').then(
			(mod) => mod.ProjectsShowcase
		),
	{ ssr: true }
);

const Education = dynamic(
	() => import('@/components/sections/education').then((mod) => mod.Education),
	{ ssr: true }
);

const Faq = dynamic(
	() => import('@/components/sections/faq').then((mod) => mod.Faq),
	{ ssr: true }
);

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<PageReveal delay={0.5}>
			<HeroSectionWithGridScan />
			<AllTechnologiesLoop />
			<AboutMe />
			<WorkExperience />
			<ProjectsShowcase />
			<Education />
			<Faq />
		</PageReveal>
	);
}
