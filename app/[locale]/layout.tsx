import { ChristmasSnowfall } from '@/components/backgrounds/christmas-snowfall';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/sections/header';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';
import { getBaseUrlObject } from '@/utils/url';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

type SeoCopy = {
	title: { default: string; template: string };
	description: string;
	ogTitle: string;
	ogDescription: string;
};

const seoCopyByLocale: Record<'en' | 'pt', SeoCopy> = {
	en: {
		title: {
			default: 'Júlio César — Frontend Engineer | React · Next.js',
			template: '%s — Júlio César',
		},
		description:
			'Senior Frontend Engineer building fast, SEO-friendly React and Next.js apps with strong architecture and Web Vitals focus.',
		ogTitle: 'Júlio César — Frontend Engineer',
		ogDescription:
			'Senior Frontend Engineer building high-performance React/Next.js products focused on Web Vitals, SEO, and scalability.',
	},
	pt: {
		title: {
			default: 'Júlio César — Engenheiro Frontend | React · Next.js',
			template: '%s — Júlio César',
		},
		description:
			'Engenheiro Frontend Sênior criando apps React e Next.js rápidos e otimizados para SEO, com foco em arquitetura e Web Vitals.',
		ogTitle: 'Júlio César — Engenheiro Frontend',
		ogDescription:
			'Engenheiro Frontend Sênior criando produtos React/Next.js de alta performance, com foco em Web Vitals, SEO e escalabilidade.',
	},
};

function getSeoCopy(locale: string): SeoCopy {
	return locale === 'pt' ? seoCopyByLocale.pt : seoCopyByLocale.en;
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	const localizedSeoCopy = getSeoCopy(locale);

	const metadataBase = getBaseUrlObject();

	const normalizedLocale = locale === 'pt' ? 'pt' : 'en';

	const canonicalUrl = new URL(`/${normalizedLocale}`, metadataBase).toString();
	const profileImageUrl = new URL('/profile.webp', metadataBase).toString();

	return {
		metadataBase,
		title: localizedSeoCopy.title,
		description: localizedSeoCopy.description,
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
			title: localizedSeoCopy.ogTitle,
			description: localizedSeoCopy.ogDescription,
			url: canonicalUrl,
			siteName: 'Júlio César — Portfolio',
			images: [
				{
					url: profileImageUrl,
					width: 1200,
					height: 630,
					alt: localizedSeoCopy.ogTitle,
				},
			],
			locale: normalizedLocale === 'pt' ? 'pt_BR' : 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: localizedSeoCopy.ogTitle,
			description: localizedSeoCopy.ogDescription,
			images: [profileImageUrl],
		},
		alternates: {
			canonical: canonicalUrl,
			languages: {
				en: new URL('/en', metadataBase).toString(),
				pt: new URL('/pt', metadataBase).toString(),
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
	const localizedSeoCopy = getSeoCopy(locale);

	return (
		<html lang={locale} className='scroll-smooth' suppressHydrationWarning>
			<head>
				<meta name='description' content={localizedSeoCopy.description} />

				<link
					rel='preload'
					as='image'
					href='/profile.webp'
					fetchPriority='high'
				/>
			</head>
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

				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
