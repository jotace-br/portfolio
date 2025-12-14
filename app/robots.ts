import { getFormattedUrl } from '@/utils/url';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: getFormattedUrl('/sitemap.xml'),
	};
}
