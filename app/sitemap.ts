import { PROJECTS } from '@/constants/projects';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/utils/url';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl();
	const locales = routing.locales;

	// Generate home page entries for all locales
	const homeEntries = locales.map((locale) => ({
		url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 1.0,
		alternates: {
			languages: Object.fromEntries(
				locales.map((l) => [l, l === 'en' ? baseUrl : `${baseUrl}/${l}`])
			),
		},
	}));

	// Generate project entries for all locales
	const projectEntries = locales.flatMap((locale) =>
		PROJECTS.map((project) => ({
			url:
				locale === 'en'
					? `${baseUrl}/projects/${project.slug}`
					: `${baseUrl}/${locale}/projects/${project.slug}`,
			lastModified: project.date ? new Date(project.date) : undefined,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					locales.map((languageIdentifier) => [
						languageIdentifier,
						languageIdentifier === 'en'
							? `${baseUrl}/projects/${project.slug}`
							: `${baseUrl}/${languageIdentifier}/projects/${project.slug}`,
					])
				),
			},
		}))
	);

	return [...homeEntries, ...projectEntries];
}
