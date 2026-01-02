import { ChristmasSnowfall } from '@/components/backgrounds/christmas-snowfall';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/sections/header';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';
import { getBaseUrl } from '@/utils/url';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const origin = getBaseUrl();

	const metadata = {
		en: {
			title: {
				default: 'Júlio César — Frontend Engineer | React · Next.js',
				template: '%s — Júlio César',
			},
			description:
				'Frontend Engineer with 5+ years building performant, SEO-friendly React and Next.js apps. Focused on Web Vitals, architecture, and clean code.',
			ogTitle: 'Júlio César — Frontend Engineer',
			ogDescription:
				'Frontend Engineer with 5+ years building high-performance React/Next.js applications, focusing on Web Vitals, SEO and scalable architecture.',
		},
		pt: {
			title: {
				default: 'Júlio César — Engenheiro Frontend | React · Next.js',
				template: '%s — Júlio César',
			},
			description:
				'Engenheiro Frontend com mais de 5 anos construindo aplicações React e Next.js performantes e otimizadas para SEO. Focado em Web Vitals, arquitetura e código limpo.',
			ogTitle: 'Júlio César — Engenheiro Frontend',
			ogDescription:
				'Engenheiro Frontend com mais de 5 anos construindo aplicações React/Next.js de alta performance, focado em Web Vitals, SEO e arquitetura escalável.',
		},
	};

	const localizedMetadata =
		metadata[locale as keyof typeof metadata] || metadata.en;

	return {
		title: localizedMetadata.title,
		description: localizedMetadata.description,
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
			title: localizedMetadata.ogTitle,
			description: localizedMetadata.ogDescription,
			url: origin,
			siteName: 'Júlio César — Portfolio',
			images: [
				{
					url: `${origin}/og/og-image.png`,
					width: 1200,
					height: 630,
					alt: localizedMetadata.ogTitle,
				},
			],
			locale: locale === 'pt' ? 'pt_BR' : 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: localizedMetadata.ogTitle,
			description: localizedMetadata.ogDescription,
			images: [`${origin}/og/og-image.png`],
		},
		alternates: {
			canonical: origin,
			languages: {
				en: `${origin}/en`,
				pt: `${origin}/pt`,
			},
		},
		robots: {
			index: true,
			follow: true,
			nocache: false,
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	// Providing all messages to the client side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} className='scroll-smooth' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-zinc-950`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange={false}
					>
						<ChristmasSnowfall />
						<Header />
						<main>{children}</main>
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
