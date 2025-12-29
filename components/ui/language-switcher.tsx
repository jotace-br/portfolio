'use client';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

const locales: { code: Locale; label: string; flag: string }[] = [
	{ code: 'en', label: 'English', flag: '🇺🇸' },
	{ code: 'pt', label: 'Português', flag: '🇧🇷' },
];

interface LanguageSwitcherProps {
	className?: string;
	variant?: 'desktop' | 'mobile';
}

export function LanguageSwitcher({
	className,
	variant = 'desktop',
}: LanguageSwitcherProps) {
	const t = useTranslations('languageSwitcher');
	const currentLocale = useLocale() as Locale;
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	if (variant === 'mobile') {
		return (
			<div className={cn('flex gap-2', className)}>
				{locales.map((locale) => (
					<Link
						key={locale.code}
						href={pathname}
						locale={locale.code}
						className={cn(
							'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
							currentLocale === locale.code
								? 'bg-highlight-primary/10 text-highlight-primary font-medium'
								: 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
						)}
					>
						<span className='text-lg'>{locale.flag}</span>
						<span className='text-sm'>{locale.label}</span>
					</Link>
				))}
			</div>
		);
	}

	return (
		<div ref={menuRef} className={cn('relative', className)}>
			<Button
				variant='ghost'
				size='icon-sm'
				onClick={() => setIsOpen(!isOpen)}
				aria-label={t('label')}
				aria-expanded={isOpen}
				aria-haspopup='menu'
				className='cursor-pointer'
			>
				<Languages className='size-4.5' />
			</Button>

			<motion.div
				initial={{ opacity: 0, y: -10, scale: 0.95 }}
				animate={{
					opacity: isOpen ? 1 : 0,
					y: isOpen ? 0 : -10,
					scale: isOpen ? 1 : 0.95,
				}}
				transition={{ duration: 0.15, ease: 'easeOut' }}
				className={cn(
					'absolute right-0 top-full mt-2 min-w-35 rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg overflow-hidden',
					!isOpen && 'pointer-events-none'
				)}
				role='menu'
			>
				{locales.map((locale, index) => (
					<Link
						key={locale.code}
						href={pathname}
						locale={locale.code}
						onClick={() => setIsOpen(false)}
						className={cn(
							'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800',
							currentLocale === locale.code &&
								'bg-highlight-primary/10 text-highlight-primary font-medium',
							index !== locales.length - 1 &&
								'border-b border-black/5 dark:border-white/5'
						)}
						role='menuitem'
					>
						<span className='text-base'>{locale.flag}</span>
						<span>{locale.label}</span>
						{currentLocale === locale.code && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='ml-auto w-1.5 h-1.5 rounded-full bg-highlight-primary'
							/>
						)}
					</Link>
				))}
			</motion.div>
		</div>
	);
}
