'use client';

import { PageReveal } from '@/components/animations/page-reveal';
import { AllTechnologiesLoop } from '@/components/sections/all-technologies-loop';
import { HeroSectionWithGridScan } from '@/components/sections/hero-section-with-grid-scan';

export default function Home() {
	return (
		<PageReveal delay={0.5}>
			<HeroSectionWithGridScan />
			<AllTechnologiesLoop />

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</PageReveal>
	);
}
