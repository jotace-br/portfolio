import { ChristmasSnowfall } from '@/components/backgrounds/christmas-snowfall';
import { Footer } from '@/components/sections/footer';
import { getBaseUrl } from '@/utils/url';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '../components/sections/header';
import { ThemeProvider } from '../providers/theme-provider';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
	const origin = getBaseUrl();

	return {
		title: {
			default: 'Júlio César — Frontend Engineer | React · Next.js',
			template: '%s — Júlio César',
		},
		description:
			'Frontend Engineer with 5+ years building performant, SEO-friendly React and Next.js apps. Focused on Web Vitals, architecture, and clean code.',
		keywords: [
			'React',
			'Next.js',
			'Frontend',
			'Performance',
			'Web Vitals',
			'SEO',
			'JavaScript',
			'Frontend Engineering',
			'Accessibility',
		],
		authors: [
			{
				name: 'Júlio César Almeida Ferreira',
				url: 'https://www.linkedin.com/in/juliocesardev',
			},
		],
		creator: 'Júlio César Almeida Ferreira',
		publisher: 'Júlio César Almeida Ferreira',
		openGraph: {
			title: 'Júlio César — Frontend Engineer',
			description:
				'Frontend Engineer with 5+ years building high-performance React/Next.js applications, focusing on Web Vitals, SEO and scalable architecture.',
			url: origin,
			siteName: 'Júlio César — Portfolio',
			images: [
				{
					url: `${origin}/og/og-image.png`,
					width: 1200,
					height: 630,
					alt: 'Júlio César — Frontend Engineer',
				},
			],
			locale: 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Júlio César — Frontend Engineer',
			description:
				'Performance-driven Frontend Engineer (React, Next.js). Focused on Web Vitals, SEO and scalable architectures.',
			images: [`${origin}/og/og-image.png`],
		},
		alternates: {
			canonical: origin,
		},
		robots: {
			index: true,
			follow: true,
			nocache: false,
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='scroll-smooth' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-zinc-950`}
			>
				<Analytics />
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange={false}
				>
					<ChristmasSnowfall />
					<Header />
					<main>
						{children}
						<SpeedInsights />
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
