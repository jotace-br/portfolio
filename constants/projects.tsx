import Image from 'next/image';
import { ReactNode } from 'react';
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

export interface ProjectData {
	id: string;
	slug: string;
	date: string;
	stack: { name: string; icon: ReactNode }[];
	media: string;
	banner: string;
	mediaType: 'image' | 'video';
	liveUrl?: string;
	githubUrl?: string;
}

export const PROJECTS: ProjectData[] = [
	{
		id: 'portfolio',
		slug: 'portfolio',
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
		media: '/videos/portfolio-video.mp4',
		banner: '/projects/portfolio-banner.webp',
		mediaType: 'video',
		liveUrl: 'https://juliocesardev.vercel.app',
		githubUrl: 'https://github.com/jotace-br/portfolio',
	},
	{
		id: 'radio-seeker',
		slug: 'radio-seeker',
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
		media: '/videos/radio-seeker-video.mp4',
		banner: '/projects/radio-seeker-banner.webp',
		mediaType: 'video',
		githubUrl: 'https://github.com/jotace-br/radio-seeker',
		liveUrl: 'https://radio-seeker.vercel.app/',
	},
	{
		id: 'weather98',
		slug: 'weather98',
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
		media: '/videos/weather98-video.mp4',
		banner: '/projects/weather98-banner.webp',
		mediaType: 'video',
		githubUrl: 'https://github.com/jotace-br/weather98',
		liveUrl: 'https://weather98.vercel.app/',
	},
	{
		id: 'burger-app',
		slug: 'burger-app',
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
		media: '/videos/burger-app-video.mp4',
		banner: '/projects/burger-app-banner.webp',
		mediaType: 'video',
		liveUrl: 'https://burger-app-seven.vercel.app/',
		githubUrl: 'https://github.com/jotace-br/burger-app',
	},
];
