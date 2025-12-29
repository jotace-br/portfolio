import { PageReveal } from '@/components/animations/page-reveal';
import { AboutMe } from '@/components/sections/about-me';
import { AllTechnologiesLoop } from '@/components/sections/all-technologies-loop';
import { Education } from '@/components/sections/education';
import { Faq } from '@/components/sections/faq';
import { HeroSectionWithGridScan } from '@/components/sections/hero-section-with-grid-scan';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { WorkExperience } from '@/components/sections/work-experience';
import { setRequestLocale } from 'next-intl/server';

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
