import { PROJECTS } from '@/constants/projects';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const projectEntries = PROJECTS.map((p) => ({
		url: `/projects/${p.slug}`,
		lastModified: p.date ? new Date(p.date) : undefined,
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	}));

	return [
		{
			url: '/',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1.0,
		},
		...projectEntries,
	];
}
