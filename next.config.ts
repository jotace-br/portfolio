import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
	images: {
		qualities: [75, 85, 95, 100],
	},
};

export default withNextIntl(nextConfig);
