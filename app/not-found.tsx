import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { NotFoundClient } from '@/components/not-found-client';
import { ThemeProvider } from '@/providers/theme-provider';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '404 - Page Not Found',
};

export default async function NotFound() {
	const headersList = await headers();
	const pathname = headersList.get('x-pathname') || '';

	let locale = routing.defaultLocale;
	const pathSegments = pathname.split('/').filter(Boolean);
	if (
		pathSegments.length > 0 &&
		routing.locales.includes(pathSegments[0] as 'en' | 'pt')
	) {
		locale = pathSegments[0] as 'en' | 'pt';
	}

	const t = await getTranslations({ locale, namespace: 'notFound' });

	const homeUrl = locale === routing.defaultLocale ? '/' : `/${locale}`;

	const translations = {
		goBack: t('goBack'),
		tryAgain: t('tryAgain'),
		backHome: t('backHome'),
		clickHint: t('clickHint'),
		ghostHint: t('ghostHint'),
		clickedGhost: t.raw('clickedGhost') as string,
		clickedGhostPlural: t.raw('clickedGhostPlural') as string,
		persistent: t('persistent'),
		stopNow: t('stopNow'),
		suggestions: t('suggestions'),
		suggestionItems: {
			petCat: t('suggestionItems.petCat'),
			touchGrass: t('suggestionItems.touchGrass'),
			hydrate: t('suggestionItems.hydrate'),
			stretch: t('suggestionItems.stretch'),
			contemplate: t('suggestionItems.contemplate'),
		},
		funnyMessages: t.raw('funnyMessages') as string[],
		funnyExcuses: t.raw('funnyExcuses') as string[],
	};

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<body className='antialiased'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<NotFoundClient
						locale={locale}
						homeUrl={homeUrl}
						translations={translations}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
