import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '../components/header';
import { ThemeProvider } from '../components/theme-provider';
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
	title: 'Júlio César - Front-End Developer | Portfolio',
	description:
		'Front-End Developer crafting beautiful, performant web experiences with modern technologies. Passionate about creating elegant solutions to complex problems.',
	keywords: [
		'Front-End Developer',
		'Web Developer',
		'Software Engineer',
		'React',
		'Next.js',
		'TypeScript',
		'Portfolio',
	],
	authors: [{ name: 'Júlio César' }],
	creator: 'Júlio César',
	openGraph: {
		title: 'Júlio César - Front-End Developer',
		description:
			'Front-End Developer crafting beautiful, performant web experiences with modern technologies.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Júlio César - Front-End Developer',
		description:
			'Front-End Developer crafting beautiful, performant web experiences with modern technologies.',
	},
};

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
				</ThemeProvider>
			</body>
		</html>
	);
}
