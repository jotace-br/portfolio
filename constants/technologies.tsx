import { LogoItem } from '@/components/animations/logo-loop';
import Image from 'next/image';
import { FaAws } from 'react-icons/fa6';
import {
	SiAntdesign,
	SiApollographql,
	SiAuth0,
	SiBootstrap,
	SiBun,
	SiChakraui,
	SiChartdotjs,
	SiContentful,
	SiCss3,
	SiCypress,
	SiD3Dotjs,
	SiDocker,
	SiEsbuild,
	SiEslint,
	SiExpress,
	SiFigma,
	SiFramer,
	SiGit,
	SiGithub,
	SiGithubactions,
	SiGitlab,
	SiGooglecloud,
	SiGraphql,
	SiHtml5,
	SiJavascript,
	SiJest,
	SiJira,
	SiMantine,
	SiMui,
	SiMysql,
	SiNextdotjs,
	SiNginx,
	SiNodedotjs,
	SiNotion,
	SiNpm,
	SiOpenai,
	SiPnpm,
	SiPostgresql,
	SiPostman,
	SiPrettier,
	SiRadixui,
	SiReact,
	SiReacthookform,
	SiRedux,
	SiSanity,
	SiSass,
	SiSlack,
	SiSocketdotio,
	SiStorybook,
	SiStrapi,
	SiStripe,
	SiStyledcomponents,
	SiSwagger,
	SiSwr,
	SiTailwindcss,
	SiTestinglibrary,
	SiThreedotjs,
	SiTurbo,
	SiTypescript,
	SiVercel,
	SiVite,
	SiVitest,
	SiWebgl,
	SiWebpack,
	SiYarn,
	SiZod,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export const TECHNOLOGIES: LogoItem[] = [
	// Core Frontend
	{
		node: <SiReact className='text-[#61DAFB]' />,
		title: 'React',
		href: 'https://react.dev',
		ariaLabel: 'React',
	},
	{
		node: <SiNextdotjs className='dark:text-white text-black' />,
		title: 'Next.js',
		href: 'https://nextjs.org',
		ariaLabel: 'Next.js',
	},
	{
		node: <SiTypescript className='text-[#3178C6]' />,
		title: 'TypeScript',
		href: 'https://www.typescriptlang.org',
		ariaLabel: 'TypeScript',
	},
	{
		node: <SiJavascript className='text-[#F7DF1E]' />,
		title: 'JavaScript',
		href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
		ariaLabel: 'JavaScript',
	},
	{
		node: <SiHtml5 className='text-[#E34F26]' />,
		title: 'HTML5',
		href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
		ariaLabel: 'HTML5',
	},
	{
		node: <SiCss3 className='text-[#1572B6]' />,
		title: 'CSS3',
		href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
		ariaLabel: 'CSS3',
	},

	// Styling
	{
		node: <SiTailwindcss className='text-[#06B6D4]' />,
		title: 'Tailwind CSS',
		href: 'https://tailwindcss.com',
		ariaLabel: 'Tailwind CSS',
	},
	{
		node: <SiSass className='text-[#CC6699]' />,
		title: 'Sass',
		href: 'https://sass-lang.com',
		ariaLabel: 'Sass',
	},
	{
		node: <SiStyledcomponents className='text-[#DB7093]' />,
		title: 'Styled Components',
		href: 'https://styled-components.com',
		ariaLabel: 'Styled Components',
	},
	{
		node: <SiBootstrap className='text-[#7952B3]' />,
		title: 'Bootstrap',
		href: 'https://getbootstrap.com',
		ariaLabel: 'Bootstrap',
	},

	// UI Libraries
	{
		node: <SiRadixui className='dark:text-white text-black' />,
		title: 'Radix UI',
		href: 'https://www.radix-ui.com',
		ariaLabel: 'Radix UI',
	},
	{
		node: <SiMui className='text-[#007FFF]' />,
		title: 'Material-UI',
		href: 'https://mui.com',
		ariaLabel: 'Material-UI',
	},
	{
		node: <SiChakraui className='text-[#319795]' />,
		title: 'Chakra UI',
		href: 'https://chakra-ui.com',
		ariaLabel: 'Chakra UI',
	},
	{
		node: <SiMantine className='text-[#339AF0]' />,
		title: 'Mantine',
		href: 'https://mantine.dev',
		ariaLabel: 'Mantine',
	},
	{
		node: <SiAntdesign className='text-[#0170FE]' />,
		title: 'Ant Design',
		href: 'https://ant.design',
		ariaLabel: 'Ant Design',
	},

	// State Management
	{
		node: <SiRedux className='text-[#764ABC]' />,
		title: 'Redux',
		href: 'https://redux.js.org',
		ariaLabel: 'Redux',
	},
	{
		node: <Image src='/logos/zustand.svg' alt='' width={48} height={48} />,
		title: 'Zustand',
		href: 'https://zustand-demo.pmnd.rs',
		ariaLabel: 'Zustand',
	},
	{
		node: (
			<Image
				src='/logos/jotai.svg'
				alt=''
				width={48}
				height={48}
				className='dark:invert'
			/>
		),
		title: 'Jotai',
		href: 'https://jotai.org',
		ariaLabel: 'Jotai',
	},

	// Data Fetching
	{
		node: (
			<Image
				src='/logos/tanstack.svg'
				alt=''
				width={48}
				height={48}
				className='dark:invert'
			/>
		),
		title: 'TanStack Query',
		href: 'https://tanstack.com/query',
		ariaLabel: 'TanStack Query',
	},
	{
		node: <SiSwr className='dark:text-white text-black' />,
		title: 'SWR',
		href: 'https://swr.vercel.app',
		ariaLabel: 'SWR',
	},
	{
		node: <SiGraphql className='text-[#E10098]' />,
		title: 'GraphQL',
		href: 'https://graphql.org',
		ariaLabel: 'GraphQL',
	},
	{
		node: <SiApollographql className='text-[#311C87]' />,
		title: 'Apollo GraphQL',
		href: 'https://www.apollographql.com',
		ariaLabel: 'Apollo GraphQL',
	},

	// Forms
	{
		node: <SiReacthookform className='text-[#EC5990]' />,
		title: 'React Hook Form',
		href: 'https://react-hook-form.com',
		ariaLabel: 'React Hook Form',
	},
	{
		node: <SiZod className='text-[#3E67B1]' />,
		title: 'Zod',
		href: 'https://zod.dev',
		ariaLabel: 'Zod',
	},

	// Backend
	{
		node: <SiNodedotjs className='text-[#339933]' />,
		title: 'Node.js',
		href: 'https://nodejs.org',
		ariaLabel: 'Node.js',
	},
	{
		node: <SiBun className='dark:text-white text-black' />,
		title: 'Bun',
		href: 'https://bun.sh',
		ariaLabel: 'Bun',
	},
	{
		node: <SiExpress className='dark:text-white text-black' />,
		title: 'Express',
		href: 'https://expressjs.com',
		ariaLabel: 'Express',
	},

	// Databases
	{
		node: <SiPostgresql className='text-[#4169E1]' />,
		title: 'PostgreSQL',
		href: 'https://www.postgresql.org',
		ariaLabel: 'PostgreSQL',
	},
	{
		node: <SiMysql className='text-[#4479A1]' />,
		title: 'MySQL',
		href: 'https://www.mysql.com',
		ariaLabel: 'MySQL',
	},

	// Testing
	{
		node: <SiJest className='text-[#C21325]' />,
		title: 'Jest',
		href: 'https://jestjs.io',
		ariaLabel: 'Jest',
	},
	{
		node: <SiTestinglibrary className='text-[#E33332]' />,
		title: 'Testing Library',
		href: 'https://testing-library.com',
		ariaLabel: 'Testing Library',
	},
	{
		node: <SiVitest className='text-[#6E9F18]' />,
		title: 'Vitest',
		href: 'https://vitest.dev',
		ariaLabel: 'Vitest',
	},
	{
		node: <SiCypress className='text-[#17202C]' />,
		title: 'Cypress',
		href: 'https://www.cypress.io',
		ariaLabel: 'Cypress',
	},
	{
		node: <Image src='/logos/playwright.svg' alt='' width={48} height={48} />,
		title: 'Playwright',
		href: 'https://playwright.dev',
		ariaLabel: 'Playwright',
	},

	// Build Tools
	{
		node: <SiVite className='text-[#646CFF]' />,
		title: 'Vite',
		href: 'https://vitejs.dev',
		ariaLabel: 'Vite',
	},
	{
		node: <SiWebpack className='text-[#8DD6F9]' />,
		title: 'Webpack',
		href: 'https://webpack.js.org',
		ariaLabel: 'Webpack',
	},
	{
		node: <SiEsbuild className='text-[#FFCF00]' />,
		title: 'esbuild',
		href: 'https://esbuild.github.io',
		ariaLabel: 'esbuild',
	},
	{
		node: <SiTurbo className='text-[#EF4444]' />,
		title: 'Turborepo',
		href: 'https://turbo.build',
		ariaLabel: 'Turborepo',
	},

	// Package Managers
	{
		node: <SiNpm className='text-[#CB3837]' />,
		title: 'npm',
		href: 'https://www.npmjs.com',
		ariaLabel: 'npm',
	},
	{
		node: <SiYarn className='text-[#2C8EBB]' />,
		title: 'Yarn',
		href: 'https://yarnpkg.com',
		ariaLabel: 'Yarn',
	},
	{
		node: <SiPnpm className='text-[#F69220]' />,
		title: 'pnpm',
		href: 'https://pnpm.io',
		ariaLabel: 'pnpm',
	},

	// DevOps & Containers
	{
		node: <SiDocker className='text-[#2496ED]' />,
		title: 'Docker',
		href: 'https://www.docker.com',
		ariaLabel: 'Docker',
	},
	{
		node: <SiNginx className='text-[#009639]' />,
		title: 'Nginx',
		href: 'https://nginx.org',
		ariaLabel: 'Nginx',
	},

	// CI/CD
	{
		node: <SiGithubactions className='text-[#2088FF]' />,
		title: 'GitHub Actions',
		href: 'https://github.com/features/actions',
		ariaLabel: 'GitHub Actions',
	},
	{
		node: <SiGitlab className='text-[#FC6D26]' />,
		title: 'GitLab CI/CD',
		href: 'https://gitlab.com',
		ariaLabel: 'GitLab CI/CD',
	},

	// Cloud & Hosting
	{
		node: <SiVercel className='dark:text-white text-black' />,
		title: 'Vercel',
		href: 'https://vercel.com',
		ariaLabel: 'Vercel',
	},
	{
		node: <FaAws className='text-[#FF9900]' />,
		title: 'AWS',
		href: 'https://aws.amazon.com',
		ariaLabel: 'AWS',
	},
	{
		node: <SiGooglecloud className='text-[#4285F4]' />,
		title: 'Google Cloud',
		href: 'https://cloud.google.com',
		ariaLabel: 'Google Cloud',
	},

	// Version Control & Code Quality
	{
		node: <SiGit className='text-[#F05032]' />,
		title: 'Git',
		href: 'https://git-scm.com',
		ariaLabel: 'Git',
	},
	{
		node: <SiGithub className='dark:text-white text-black' />,
		title: 'GitHub',
		href: 'https://github.com',
		ariaLabel: 'GitHub',
	},
	{
		node: <SiEslint className='text-[#4B32C3]' />,
		title: 'ESLint',
		href: 'https://eslint.org',
		ariaLabel: 'ESLint',
	},
	{
		node: <SiPrettier className='text-[#F7B93E]' />,
		title: 'Prettier',
		href: 'https://prettier.io',
		ariaLabel: 'Prettier',
	},

	// Design & Prototyping
	{
		node: <SiFigma className='text-[#F24E1E]' />,
		title: 'Figma',
		href: 'https://www.figma.com',
		ariaLabel: 'Figma',
	},
	{
		node: <SiStorybook className='text-[#FF4785]' />,
		title: 'Storybook',
		href: 'https://storybook.js.org',
		ariaLabel: 'Storybook',
	},

	// Animation & 3D
	{
		node: <SiFramer className='dark:text-white text-black' />,
		title: 'Framer Motion',
		href: 'https://www.framer.com/motion',
		ariaLabel: 'Framer Motion',
	},
	{
		node: <SiThreedotjs className='dark:text-white text-black' />,
		title: 'Three.js',
		href: 'https://threejs.org',
		ariaLabel: 'Three.js',
	},
	{
		node: <SiWebgl className='text-[#990000]' />,
		title: 'WebGL',
		href: 'https://www.khronos.org/webgl',
		ariaLabel: 'WebGL',
	},

	// Data Visualization
	{
		node: <SiD3Dotjs className='text-[#F9A03C]' />,
		title: 'D3.js',
		href: 'https://d3js.org',
		ariaLabel: 'D3.js',
	},
	{
		node: <SiChartdotjs className='text-[#FF6384]' />,
		title: 'Chart.js',
		href: 'https://www.chartjs.org',
		ariaLabel: 'Chart.js',
	},
	{
		node: <span className='text-[#8884d8] font-bold text-lg'>Re</span>,
		title: 'Recharts',
		href: 'https://recharts.org',
		ariaLabel: 'Recharts',
	},

	// Real-time Communication
	{
		node: <SiSocketdotio className='dark:text-white text-black' />,
		title: 'Socket.IO',
		href: 'https://socket.io',
		ariaLabel: 'Socket.IO',
	},
	{
		node: <span className='text-[#4A90E2] font-bold'>WS</span>,
		title: 'WebSockets',
		href: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
		ariaLabel: 'WebSockets',
	},
	{
		node: <span className='text-[#00C7B7] font-bold'>SSE</span>,
		title: 'Server-Sent Events',
		href: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
		ariaLabel: 'Server-Sent Events',
	},

	// Authentication
	{
		node: <SiAuth0 className='text-[#EB5424]' />,
		title: 'Auth0',
		href: 'https://auth0.com',
		ariaLabel: 'Auth0',
	},
	{
		node: <Image src='/logos/nextauth.svg' alt='' width={48} height={48} />,
		title: 'NextAuth.js',
		href: 'https://next-auth.js.org',
		ariaLabel: 'NextAuth.js',
	},

	// Payments
	{
		node: <SiStripe className='text-[#635BFF]' />,
		title: 'Stripe',
		href: 'https://stripe.com',
		ariaLabel: 'Stripe',
	},

	// Documentation
	{
		node: <SiSwagger className='text-[#85EA2D]' />,
		title: 'Swagger',
		href: 'https://swagger.io',
		ariaLabel: 'Swagger',
	},

	// Project Management
	{
		node: <SiJira className='text-[#0052CC]' />,
		title: 'Jira',
		href: 'https://www.atlassian.com/software/jira',
		ariaLabel: 'Jira',
	},
	{
		node: <SiNotion className='dark:text-white text-black' />,
		title: 'Notion',
		href: 'https://www.notion.so',
		ariaLabel: 'Notion',
	},
	{
		node: <SiSlack className='text-[#4A154B]' />,
		title: 'Slack',
		href: 'https://slack.com',
		ariaLabel: 'Slack',
	},

	// API Tools
	{
		node: <SiPostman className='text-[#FF6C37]' />,
		title: 'Postman',
		href: 'https://www.postman.com',
		ariaLabel: 'Postman',
	},

	// AI & ML
	{
		node: <SiOpenai className='dark:text-white text-black' />,
		title: 'OpenAI',
		href: 'https://openai.com',
		ariaLabel: 'OpenAI',
	},

	// IDE
	{
		node: <VscVscode className='text-[#007ACC]' />,
		title: 'VS Code',
		href: 'https://code.visualstudio.com',
		ariaLabel: 'VS Code',
	},

	// CMS
	{
		node: <SiContentful className='text-[#2478CC]' />,
		title: 'Contentful',
		href: 'https://www.contentful.com',
		ariaLabel: 'Contentful',
	},
	{
		node: <SiSanity className='text-[#F03E2F]' />,
		title: 'Sanity',
		href: 'https://www.sanity.io',
		ariaLabel: 'Sanity',
	},
	{
		node: <SiStrapi className='text-[#4945FF]' />,
		title: 'Strapi',
		href: 'https://strapi.io',
		ariaLabel: 'Strapi',
	},
	{
		node: (
			<Image
				src='/logos/hygraph.svg'
				alt=''
				width={48}
				height={48}
				className='dark:invert'
			/>
		),
		title: 'Hygraph',
		href: 'https://hygraph.com',
		ariaLabel: 'Hygraph',
	},
];
