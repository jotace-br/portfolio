'use client';

import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Files } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BsLinkedin } from 'react-icons/bs';
import { SiGithub } from 'react-icons/si';
import { Button } from '../ui/button';

// CircularText is non-critical interactive element, safe to lazy load with fixed-size placeholder
const CircularText = dynamic(
	() => import('../text-animations/circular-text').then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className='size-24 sm:size-28 md:size-32 rounded-full border border-dashed border-slate-400 dark:border-gray-600 animate-spin-slow' />
		),
	}
);

export function HeroSection() {
	const t = useTranslations('hero');

	return (
		<section
			id='home'
			className='relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8 pt-14 pointer-events-none'
			aria-labelledby='hero-heading'
		>
			<div className='mx-auto max-w-6xl w-full'>
				<div className='grid gap-12 lg:grid-cols-2 lg:gap-16 items-center'>
					<div className='relative isolate rounded-2xl space-y-8 text-center lg:text-left'>
						<div
							aria-hidden='true'
							className='absolute inset-0 rounded-2xl pointer-events-none z-0'
						/>
						<div className='relative z-10 space-y-4'>
							<h1
								id='hero-heading'
								className='text-5xl font-bold tracking-tight text-slate-900 dark:text-gray-100 sm:text-6xl md:text-7xl lg:text-8xl [-webkit-text-stroke:0.6px_#0f172bd8] dark:[-webkit-text-stroke:0px_rgba(0,0,0,0)]'
							>
								{t('greeting')}
							</h1>
							<p className='text-xl text-slate-900 dark:text-gray-100 sm:text-2xl md:text-3xl font-medium'>
								{t('role')}
							</p>
						</div>
						<p className='mx-auto max-w-2xl text-base text-slate-900 dark:text-slate-50 sm:text-lg lg:mx-0 font-medium leading-relaxed'>
							{t('description')}
						</p>

						<div className='flex justify-center lg:justify-start gap-2'>
							<a
								href={t('resumeUrl')}
								target='_blank'
								rel='noopener noreferrer'
								className='pointer-events-auto'
							>
								<Button size='lg' variant='default' className='cursor-pointer'>
									<Files /> {t('resume')}
								</Button>
							</a>
							<a
								href='https://www.linkedin.com/in/juliocesardev/'
								target='_blank'
								rel='noopener noreferrer'
								className='pointer-events-auto'
							>
								<Button size='lg' variant='outline' className='cursor-pointer'>
									<BsLinkedin size={20} />{' '}
									<span className='hidden sm:inline'>LinkedIn</span>
								</Button>
							</a>
							<a
								href='https://github.com/jotace-br'
								target='_blank'
								rel='noopener noreferrer'
								className='pointer-events-auto'
							>
								<Button size='lg' variant='outline' className='cursor-pointer'>
									<SiGithub size={20} />{' '}
									<span className='hidden sm:inline'>GitHub</span>
								</Button>
							</a>
						</div>
					</div>

					<div className='flex justify-center lg:justify-end'>
						<div className='relative size-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64'>
							<Image
								src='/profile.webp'
								alt={t('profileAlt')}
								fill
								priority
								fetchPriority='high'
								quality={90}
								loading='eager'
								className='rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 shadow-xl'
								sizes='(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px'
							/>

							<Link
								href='#contact'
								className='absolute -bottom-8 sm:-bottom-10 md:-bottom-12 -left-6 sm:-left-8 md:-left-10 pointer-events-auto'
								aria-label={t('contactMe')}
							>
								<CircularText
									text={t('getInTouch')}
									onHover='goBonkers'
									spinDuration={20}
									className='text-slate-950 dark:text-gray-100 size-24 sm:size-28 md:size-32'
								>
									<ArrowUpRight className='size-4 sm:size-5 md:size-6 text-slate-950 dark:text-gray-100' />
								</CircularText>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
