import { Project } from '@/components/sections/projects-showcase';
import Image from 'next/image';
import {
	SiAxios,
	SiBun,
	SiFramer,
	SiI18Next,
	SiJavascript,
	SiLodash,
	SiLucide,
	SiNextdotjs,
	SiRadixui,
	SiReact,
	SiShadcnui,
	SiStyledcomponents,
	SiTailwindcss,
	SiThreedotjs,
	SiTypescript,
	SiVercel,
	SiVite,
	SiYarn,
	SiZod,
} from 'react-icons/si';

export const PROJECTS: Project[] = [
	{
		id: 'portfolio',
		slug: 'portfolio',
		name: 'Personal Portfolio',
		description: 'Is this a temporal loop? You are already here! 😄',
		overview:
			'This repository contains a production-ready Next.js portfolio with a modular component structure, custom design tokens, and accessibility-focused UI. It includes a homepage with hero, projects, education and contact sections, plus dedicated project pages and a minimal CMS-like data structure driven by TypeScript types.',
		date: '2025-12-10T00:00:00-03:00',
		stack: [
			{ name: 'Next.js', icon: <SiNextdotjs /> },
			{ name: 'React', icon: <SiReact /> },
			{ name: 'TypeScript', icon: <SiTypescript /> },
			{ name: 'JavaScript', icon: <SiJavascript /> },
			{ name: 'Tailwind CSS', icon: <SiTailwindcss /> },
			{ name: 'Framer Motion', icon: <SiFramer /> },
			{
				name: 'GSAP',
				icon: (
					<Image
						src='/logos/gsap.svg'
						alt=''
						width={16}
						height={16}
						className='dark:invert'
					/>
				),
			},
			{ name: 'Three.js', icon: <SiThreedotjs /> },
			{ name: 'Radix UI', icon: <SiRadixui /> },
			{ name: 'shadcn/ui', icon: <SiShadcnui /> },
			{ name: 'react-hook-form', icon: <SiReact /> },
			{ name: 'Lucide React', icon: <SiLucide /> },
			{ name: 'react-icons', icon: <SiReact /> },
			{ name: 'Bun', icon: <SiBun /> },
			{ name: 'Vercel', icon: <SiVercel /> },
		],
		keyFeatures: [
			'Server and client components where appropriate (app router structure)',
			'Type-safe content model for projects and metadata',
			'Responsive layout and modern UI tokens (dark + light mode)',
			'Optimized images and metadata for social sharing',
		],
		decisions: [
			'Use Next.js App Router for a clear separation between server and client rendering',
			'TypeScript-first data shapes so project pages are strongly typed and editor-friendly',
			'Tailwind for rapid, consistent styling and small bundle size',
		],
		impact: [
			'Smaller time-to-market for new content because projects are simple data objects',
			'Improved UX on mobile and desktop with optimized images and semantic markup',
			'Easier maintenance thanks to component-driven architecture',
		],
		media: 'https://files.catbox.moe/1nuvft.mp4',
		banner: '/projects/portfolio-banner.webp',
		mediaType: 'video',
		liveUrl: 'https://juliocesardev.vercel.app',
		githubUrl: 'https://github.com/jotace-br/portfolio',
	},
	{
		id: 'radio-seeker',
		slug: 'radio-seeker',
		name: 'Radio Seeker',
		description:
			'A web application that lets users search, add, edit, remove, and listen to online radio stations. With a simple, user-friendly interface and practical features, users can easily manage their favorite radio stations.',
		overview:
			'Radio Seeker is a Next.js (v14.2.3) application built with JavaScript that emphasizes usability and accessibility. The UI is implemented with Radix UI and shadcn/ui and styled with Tailwind CSS. Forms and validation are handled with react-hook-form, @hookform/resolvers, and Zod, while notifications use Sonner. The app supports station search, inline playback, local persistence of favorites (localStorage), and quick editing. Architecturally, Next.js was chosen for hybrid routing and SSG/SSR where appropriate, keeping a lean bundle and a fast developer experience.',
		date: '2024-08-30T00:00:00-03:00',
		stack: [
			{ name: 'Next.js', icon: <SiNextdotjs /> },
			{ name: 'React', icon: <SiReact /> },
			{ name: 'TypeScript', icon: <SiTypescript /> },
			{ name: 'JavaScript', icon: <SiJavascript /> },
			{ name: 'Tailwind CSS', icon: <SiTailwindcss /> },
			{ name: 'Radix UI', icon: <SiRadixui /> },
			{ name: 'shadcn/ui', icon: <SiShadcnui /> },
			{ name: 'react-hook-form', icon: <SiReact /> },
			{ name: 'Zod', icon: <SiZod /> },
			{ name: 'Sonner', icon: <SiShadcnui /> },
			{ name: 'Yarn', icon: <SiYarn /> },
			{ name: 'Vercel', icon: <SiVercel /> },
		],
		keyFeatures: [
			'Search stations by name or metadata',
			'Add, edit and remove stations from a persisted list',
			'Inline audio player with play/pause and basic controls',
			'Persist favorites locally with optional backend sync',
			'Accessible, component-driven UI built with Radix + shadcn/ui',
		],
		decisions: [
			'Choose Next.js for hybrid routing and SSG/SSR where appropriate',
			'Use Radix UI + shadcn/ui to build accessible, composable components',
			'Use react-hook-form + Zod for resilient form handling and validation',
			'Persist favorites in localStorage for offline-first UX and optional sync',
			'Centralize audio playback in a shared component to avoid concurrent streams',
		],
		impact: [
			'Demonstrates reliable inline audio playback and media controls',
			'Showcases accessible, component-driven UI patterns (Radix + shadcn)',
			'Provides a practical example of client-side persistence and CRUD flows',
			'Good technical talking point for form validation and UX trade-offs',
		],
		media: 'https://files.catbox.moe/e9mqc8.mp4',
		banner: '/projects/radio-seeker-banner.webp',
		mediaType: 'video',
		githubUrl: 'https://github.com/jotace-br/radio-seeker',
		liveUrl: 'https://radio-seeker.vercel.app/',
	},
	{
		id: 'weather98',
		slug: 'weather98',
		name: 'Weather98',
		description:
			'Compact weather dashboard with a nostalgic Windows 98 aesthetic. Integrates OpenWeather One Call 3.0, provides geolocation and search, short-term forecasts, local caching, and resilient error handling.',
		overview:
			'Weather98 pairs a playful retro UI with pragmatic engineering: Vite + React for a snappy dev experience, TypeScript for safer code, Axios for API requests, and local caching to limit network calls. Features include current conditions, a 3-day forecast, city search with geolocation fallback, and graceful handling of rate limits and missing data.',
		date: '2024-01-19T00:00:00-03:00',
		stack: [
			{ name: 'React', icon: <SiReact /> },
			{ name: 'Vite', icon: <SiVite /> },
			{ name: 'TypeScript', icon: <SiTypescript /> },
			{ name: 'JavaScript', icon: <SiJavascript /> },
			{ name: 'Tailwind CSS', icon: <SiTailwindcss /> },
			{ name: 'Axios', icon: <SiAxios /> },
			{ name: 'i18next', icon: <SiI18Next /> },
			{
				name: 'Recharts',
				icon: <span className='text-[#8884d8] font-bold text-lg'>Re</span>,
			},
			{ name: 'Lodash', icon: <SiLodash /> },
			{ name: 'Yarn', icon: <SiYarn /> },
			{ name: 'Vercel', icon: <SiVercel /> },
		],
		keyFeatures: [
			'Current weather card and 10-day forecast',
			'Search by city and optional geolocation fallback',
			'Network error handling and user-friendly messages',
			'Language and unit preferences settable and persisted',
			'Nostalgic Windows 98-inspired UI design',
		],
		decisions: [
			'Cache results for a short TTL to improve UX and stay within API rate limits',
			'Abstract API client so swapping providers is straightforward',
			'Prioritize clear micro-interactions to surface loading and error states',
		],
		impact: [
			'Shows competency integrating third-party APIs and handling edge cases',
			'Practical pattern for caching and error-handling in small apps',
			'Great interview talking point for trade-offs when designing API-driven UI',
		],
		media: 'https://files.catbox.moe/zecw0k.mp4',
		banner: '/projects/weather98-banner.webp',
		mediaType: 'video',
		githubUrl: 'https://github.com/jotace-br/weather98',
		liveUrl: 'https://weather98.vercel.app/',
	},
	{
		id: 'burger-app',
		slug: 'burger-app',
		name: 'Burger App',
		description:
			'Interactive burger menu app with component-driven UI and state management for assembling orders.',
		overview:
			'A small single-page application that demonstrates modular component design, dynamic state for building orders and a lightweight UI system. The app focuses on composition patterns and predictable state updates to simulate an ordering flow.',
		date: '2024-01-09T00:00:00-03:00',
		stack: [
			{ name: 'React', icon: <SiReact /> },
			{ name: 'Vite', icon: <SiVite /> },
			{ name: 'TypeScript', icon: <SiTypescript /> },
			{ name: 'JavaScript', icon: <SiJavascript /> },
			{ name: 'Styled Components', icon: <SiStyledcomponents /> },
			{ name: 'Yarn', icon: <SiYarn /> },
			{ name: 'Vercel', icon: <SiVercel /> },
		],
		keyFeatures: [
			'Composable UI components for burger ingredients',
			'Local state management for cart/build flow',
			'Responsive layout and keyboard-accessible controls',
		],
		decisions: [
			'Favor small, focused components so the ordering flow is easy to reason about',
			'Keep state local where possible to avoid unnecessary global complexity',
			'Use Tailwind to iterate quickly on UI without a large stylesheet',
		],
		impact: [
			'Clear demonstration of component composition and state-driven UI',
			'Lightweight bundle suitable for quick prototypes',
			'Easy to fork and adapt as a UI pattern library example',
		],
		media: 'https://files.catbox.moe/ym0dln.mp4',
		banner: '/projects/burger-app-banner.webp',
		mediaType: 'video',
		liveUrl: 'https://burger-app-seven.vercel.app/',
		githubUrl: 'https://github.com/jotace-br/burger-app',
	},
];
