import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';

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

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<div className='flex flex-col items-center justify-center min-h-screen px-4'>
					<h1 className='text-6xl font-bold text-slate-900 dark:text-gray-100 mb-4'>
						{t('title')}
					</h1>
					<p className='text-xl text-slate-600 dark:text-gray-400 mb-8'>
						{t('message')}
					</p>
					<Link
						href={homeUrl}
						className='text-highlight-primary hover:underline font-medium'
					>
						{t('backHome')}
					</Link>
				</div>
			</body>
		</html>
	);
}
