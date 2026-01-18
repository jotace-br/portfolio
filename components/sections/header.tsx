'use client';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import StaggeredMenu, {
	StaggeredMenuSocialItem,
} from '@/components/ui/staggered-menu';
import { SOCIAL_MEDIA_LINKS } from '@/constants/social-networks';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
	motion,
	useMotionTemplate,
	useMotionValueEvent,
	useScroll,
	useTransform,
	type MotionStyle,
} from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';

const menuItems = [
	{ label: 'about', ariaLabel: 'Go to about section', link: '/#about' },
	{ label: 'work', ariaLabel: 'View my work', link: '/#work' },
	{ label: 'contact', ariaLabel: 'Get in touch', link: '/#contact' },
];

const Header = memo(function Header() {
	const t = useTranslations('header');
	const { shouldReduceMotion } = useReducedMotion();
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<{ open: () => void; close: () => void } | null>(null);

	const { theme, setTheme, resolvedTheme } = useTheme();

	// Default to dark when resolvedTheme is undefined (during SSR/hydration)
	const effectiveTheme = resolvedTheme || 'dark';

	const { scrollY } = useScroll();

	const maxScroll = 20;
	const maxWidthRem = 72;
	const minWidthRem = 36;

	// Always create transform but map to a constant when reduced motion is enabled
	const widthRem = useTransform(
		scrollY,
		[0, maxScroll],
		shouldReduceMotion ? [maxWidthRem, maxWidthRem] : [maxWidthRem, minWidthRem]
	);

	// Always call useMotionTemplate (hooks must be called unconditionally)
	const widthStyle = useMotionTemplate`${widthRem}rem`;

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setIsScrolled(latest > 0);
	});

	useEffect(() => {
		const raf = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const handleThemeChange = () => {
		if (theme === 'dark' || effectiveTheme === 'dark') {
			setTheme('light');
			return;
		}

		setTheme('dark');
	};

	// Easing curve for animations
	const easeCurve = [0.43, 0.13, 0.23, 0.96] as const;

	// Animation variants based on reduced motion preference
	const headerAnimation = shouldReduceMotion
		? {}
		: {
				initial: { y: -100, opacity: 0 },
				animate: { y: 0, opacity: 1 },
				transition: { duration: 0.6, ease: easeCurve },
		  };

	const logoAnimation = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, y: -20 },
				animate: { opacity: 1, y: 0 },
				transition: {
					duration: 0.5,
					delay: 0.6,
					ease: easeCurve,
				},
		  };

	const getMenuItemAnimation = (index: number) =>
		shouldReduceMotion
			? {}
			: {
					initial: { opacity: 0, y: -20 },
					animate: { opacity: 1, y: 0 },
					transition: {
						duration: 0.5,
						delay: 0.7 + index * 0.1,
						ease: easeCurve,
					},
			  };

	const controlsAnimation = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, y: -20 },
				animate: { opacity: 1, y: 0 },
				transition: {
					duration: 0.5,
					delay: 1.0,
					ease: easeCurve,
				},
		  };

	const themeIconAnimation = shouldReduceMotion
		? {}
		: {
				initial: { rotate: -180, opacity: 0, scale: 0 },
				animate: { rotate: 0, opacity: 1, scale: 1 },
				transition: { duration: 0.3, ease: 'easeInOut' as const },
		  };

	const HeaderTag = shouldReduceMotion ? 'header' : motion.header;
	const NavTag = shouldReduceMotion ? 'nav' : motion.nav;
	const LinkTag = shouldReduceMotion ? 'a' : motion.a;

	return (
		<>
			{/* Shadow overlay for mobile */}
			<div className='md:hidden fixed top-0 left-0 right-0 h-14 bg-linear-to-b from-background/80 via-background/40 to-transparent z-40 pointer-events-none' />

			<HeaderTag
				className='fixed top-0 left-0 right-0 z-50 sm:pt-4 px-4'
				{...(!shouldReduceMotion && headerAnimation)}
			>
				<NavTag
					className={cn(
						'mx-auto rounded-full sm:px-4 transition-all duration-300 motion-reduce:transition-none',
						isScrolled
							? 'md:backdrop-blur-xl md:bg-white/70 md:dark:bg-black/70 md:border md:border-black/10 md:dark:border-white/10'
							: 'md:bg-white/50 md:dark:bg-black/50'
					)}
					style={
						{
							maxWidth:
								typeof window !== 'undefined' && window?.innerWidth < 768
									? '72rem'
									: shouldReduceMotion
									? `${maxWidthRem}rem`
									: widthStyle,
						} as CSSProperties & MotionStyle
					}
				>
					<div className='flex items-center justify-between h-12 gap-4'>
						<LinkTag
							href='/'
							className='text-xl font-bold bg-accent-foreground bg-clip-text text-transparent relative inline-block group'
							{...(!shouldReduceMotion && logoAnimation)}
						>
							{process.env.NEXT_PUBLIC_ENABLE_CHRISTMAS === 'true' &&
								(shouldReduceMotion ? (
									<span
										className='absolute -top-3 -right-6 text-2xl z-10 text-accent cursor-pointer'
										onMouseEnter={() => {
											const audio = new Audio(
												'/sounds/im-a-gnome-meme-sound-effect-woo.mp3'
											);
											audio.volume = 0.2;
											audio.play().catch(() => {});
										}}
									>
										🎅
									</span>
								) : (
									<motion.span
										className='absolute -top-3 -right-6 text-2xl z-10 text-accent cursor-pointer'
										whileHover={{
											rotate: [0, -15, 15, -15, 0],
											transition: { duration: 0.5 },
										}}
										onMouseEnter={() => {
											const audio = new Audio(
												'/sounds/im-a-gnome-meme-sound-effect-woo.mp3'
											);
											audio.volume = 0.2;
											audio.play().catch(() => {});
										}}
										style={{ transformOrigin: 'bottom center' }}
									>
										🎅
									</motion.span>
								))}
							JC
						</LinkTag>

						<div className='hidden md:flex items-center gap-2'>
							{shouldReduceMotion
								? menuItems.map((item) => (
										<div key={item.label}>
											<Button
												variant='ghost'
												size='sm'
												asChild
												className='font-light text-sm'
											>
												<Link href={item.link}>{t(item.label)}</Link>
											</Button>
										</div>
								  ))
								: menuItems.map((item, index) => (
										<motion.div
											key={item.label}
											{...getMenuItemAnimation(index)}
										>
											<Button
												variant='ghost'
												size='sm'
												asChild
												className='font-light text-sm'
											>
												<Link href={item.link}>{t(item.label)}</Link>
											</Button>
										</motion.div>
								  ))}
						</div>

						{shouldReduceMotion ? (
							<div className='hidden md:flex items-center gap-1'>
								<LanguageSwitcher />
								<Button
									variant='ghost'
									size='icon-sm'
									onClick={handleThemeChange}
									aria-label={
										effectiveTheme === 'dark'
											? t('switchToLight')
											: t('switchToDark')
									}
									aria-pressed={effectiveTheme === 'dark'}
									className='cursor-pointer'
								>
									{!mounted ? (
										<span className='inline-block w-4 h-4' />
									) : effectiveTheme === 'dark' ? (
										<Sun className='size-4.5' />
									) : (
										<Moon className='size-4.5' />
									)}
								</Button>
							</div>
						) : (
							<motion.div
								className='hidden md:flex items-center gap-1'
								{...controlsAnimation}
							>
								<LanguageSwitcher />
								<Button
									variant='ghost'
									size='icon-sm'
									onClick={handleThemeChange}
									aria-label={
										effectiveTheme === 'dark'
											? t('switchToLight')
											: t('switchToDark')
									}
									aria-pressed={effectiveTheme === 'dark'}
									className='cursor-pointer'
								>
									<motion.div
										key={mounted ? theme : 'mounted'}
										{...themeIconAnimation}
									>
										{!mounted ? (
											<span className='inline-block w-4 h-4' />
										) : effectiveTheme === 'dark' ? (
											<Sun className='size-4.5' />
										) : (
											<Moon className='size-4.5' />
										)}
									</motion.div>
								</Button>
							</motion.div>
						)}

						{/* Mobile controls - visible only on mobile */}
						<div className='md:hidden flex items-center gap-1'>
							{shouldReduceMotion ? (
								<>
									<Button
										variant='ghost'
										size='icon-sm'
										onClick={(e) => {
											e.stopPropagation();
											handleThemeChange();
											setMenuOpen(false);
										}}
										aria-label={
											effectiveTheme === 'dark'
												? t('switchToLight')
												: t('switchToDark')
										}
										aria-pressed={effectiveTheme === 'dark'}
									>
										{!mounted ? (
											<span className='inline-block w-4 h-4' />
										) : effectiveTheme === 'dark' ? (
											<Sun className='size-4.5' />
										) : (
											<Moon className='size-4.5' />
										)}
									</Button>

									<Button
										variant='ghost'
										size='icon-sm'
										onMouseDown={(e) => {
											e.stopPropagation();
										}}
										onClick={(e) => {
											e.stopPropagation();
											setMenuOpen(!menuOpen);
										}}
										aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
										aria-expanded={menuOpen}
										aria-haspopup='menu'
									>
										{menuOpen ? (
											<X className='w-5 h-5' />
										) : (
											<Menu className='w-5 h-5' />
										)}
									</Button>
								</>
							) : (
								<>
									<motion.div
										whileHover={{ rotate: 180 }}
										whileTap={{ scale: 0.9 }}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: 0.7,
											ease: easeCurve,
										}}
									>
										<Button
											variant='ghost'
											size='icon-sm'
											onClick={(e) => {
												e.stopPropagation();
												handleThemeChange();
												setMenuOpen(false);
											}}
											aria-label={
												effectiveTheme === 'dark'
													? t('switchToLight')
													: t('switchToDark')
											}
											aria-pressed={effectiveTheme === 'dark'}
										>
											<motion.div
												key={mounted ? theme : 'mounted'}
												{...themeIconAnimation}
											>
												{!mounted ? (
													<span className='inline-block w-4 h-4' />
												) : effectiveTheme === 'dark' ? (
													<Sun className='size-4.5' />
												) : (
													<Moon className='size-4.5' />
												)}
											</motion.div>
										</Button>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: 0.8,
											ease: easeCurve,
										}}
									>
										<Button
											variant='ghost'
											size='icon-sm'
											onMouseDown={(e) => {
												e.stopPropagation();
											}}
											onClick={(e) => {
												e.stopPropagation();
												setMenuOpen(!menuOpen);
											}}
											aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
											aria-expanded={menuOpen}
											aria-haspopup='menu'
										>
											{menuOpen ? (
												<X className='w-5 h-5' />
											) : (
												<Menu className='w-5 h-5' />
											)}
										</Button>
									</motion.div>
								</>
							)}
						</div>
					</div>
				</NavTag>
			</HeaderTag>

			<StaggeredMenu
				position='right'
				ref={menuRef}
				open={menuOpen}
				items={menuItems.map((item) => ({
					...item,
					label: t(item.label),
				}))}
				socialItems={SOCIAL_MEDIA_LINKS satisfies StaggeredMenuSocialItem[]}
				displaySocials={true}
				menuButtonColor={effectiveTheme === 'dark' ? '#fff' : '#000'}
				openMenuButtonColor={effectiveTheme === 'dark' ? '#000' : '#fff'}
				changeMenuColorOnOpen={true}
				displayItemNumbering={false}
				colors={
					effectiveTheme === 'dark'
						? ['#09090b', '#c182f5']
						: ['#f9fafb', '#7016ba']
				}
				accentColor={effectiveTheme === 'dark' ? '#c182f5' : '#7016ba'}
				textColor={effectiveTheme === 'dark' ? '#fff' : '#000'}
				borderColor={
					effectiveTheme === 'dark'
						? 'rgba(193, 130, 245, 0.2)'
						: 'rgba(112, 22, 186, 0.2)'
				}
				panelBackground={effectiveTheme === 'dark' ? '#09090b' : '#f9fafb'}
				isFixed={true}
				closeOnClickAway={true}
				onMenuOpen={() => setMenuOpen(true)}
				onMenuClose={() => setMenuOpen(false)}
				className='md:hidden'
				languageSwitcher={
					<LanguageSwitcher variant='mobile' className='mt-2' />
				}
				noItemsText={t('noItems')}
			/>
		</>
	);
});

export { Header };
