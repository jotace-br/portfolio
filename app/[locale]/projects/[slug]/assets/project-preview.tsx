'use client';

import ShinyText from '@/components/animations/shiny-text';
import { containerVariants, itemVariants } from '@/constants/animations';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface ProjectPreviewProps {
	media: string;
	mediaType: 'image' | 'video';
	name: string;
}

export function ProjectPreview({
	media,
	mediaType,
	name,
}: ProjectPreviewProps) {
	const locale = useLocale();

	const labels = {
		en: { section: 'Visual Showcase', title: 'Project Preview' },
		pt: { section: 'Demonstração Visual', title: 'Prévia do Projeto' },
	};

	const { section, title } = labels[locale as keyof typeof labels] || labels.en;

	return (
		<motion.section
			className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12'
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.15 }}
		>
			<div className='flex flex-col gap-6'>
				<motion.div className='flex flex-col gap-2' variants={itemVariants}>
					<motion.div
						className='flex w-fit items-center gap-2 text-highlight-primary'
						variants={itemVariants}
					>
						<Sparkle size={16} />
						<ShinyText
							text={section}
							className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
						/>
					</motion.div>

					<motion.h2
						className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
						variants={itemVariants}
					>
						{title}
					</motion.h2>
				</motion.div>

				<motion.div
					className='relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 bg-slate-100 dark:bg-zinc-900 shadow-2xl transition-transform hover:scale-[1.01]'
					variants={itemVariants}
				>
					{mediaType === 'video' ? (
						<video
							src={media}
							className='h-full w-full object-cover'
							controls
							loop
							muted
						/>
					) : (
						<Image
							src={media}
							alt={name}
							fill
							quality={100}
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 1024px'
						/>
					)}
				</motion.div>
			</div>
		</motion.section>
	);
}
