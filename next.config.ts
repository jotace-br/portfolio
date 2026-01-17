import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
	images: {
		qualities: [75, 85, 95, 100],
	},
	experimental: {
		optimizePackageImports: [
			'framer-motion',
			'lucide-react',
			'react-icons',
			'@radix-ui/react-accordion',
			'@radix-ui/react-label',
			'@radix-ui/react-separator',
			'@radix-ui/react-slot',
		],
		optimizeCss: true,
	},
	// Add cache headers for static assets
	async headers() {
		return [
			{
				source: '/projects/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/:path*.webp',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/:path*.mp4',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);
