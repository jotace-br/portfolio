import { Footer } from '@/components/sections/footer';
import { getBaseUrl } from '@/utils/url';
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
			default: 'Júlio César — Senior Front-end Engineer | React · Next.js',
			template: '%s — Júlio César',
		},
		description:
			'Senior Front-end Engineer with 5+ years building performant, SEO-friendly React and Next.js applications. Focused on Web Vitals, architecture, and sustainable codebases. Based in Maceió, Brazil. Contact: jc10ferreira@gmail.com',
		keywords: [
			'React',
			'Next.js',
			'Front-end',
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
			title: 'Júlio César — Senior Front-end Engineer',
			description:
				'Senior Front-end Engineer with 5+ years building high-performance React/Next.js applications, focusing on Web Vitals, SEO and scalable architecture.',
			url: origin,
			siteName: 'Júlio César — Portfolio',
			images: [
				{
					url: `${origin}/og/og-image.png`,
					width: 1200,
					height: 630,
					alt: 'Júlio César — Front-end Engineer',
				},
			],
			locale: 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Júlio César — Senior Front-end Engineer',
			description:
				'Performance-driven Front-end Engineer (React, Next.js). Focused on Web Vitals, SEO and scalable architectures.',
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
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange={false}
				>
					<Header />
					<main>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
