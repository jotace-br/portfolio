'use client';

import { Button } from '@/components/ui/button';
import StaggeredMenu from '@/components/ui/staggered-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
	{ label: 'About', ariaLabel: 'Go to about section', link: '#about' },
	{ label: 'Work', ariaLabel: 'View my work', link: '#work' },
	{ label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
	{ label: 'GitHub', link: 'https://github.com/jotace-br' },
	{ label: 'LinkedIn', link: 'https://linkedin.com/in/juliocesardev' },
];

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<{ open: () => void; close: () => void } | null>(null);

	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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

	return (
		<>
			<motion.header
				className='fixed top-0 left-0 right-0 z-50 pt-4 px-4'
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
			>
				<motion.nav
					className={cn(
						'max-w-6xl mx-auto rounded-full transition-all duration-300 px-4',
						isScrolled
							? 'backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/10 dark:border-white/10'
							: ' bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/5'
					)}
				>
					<div className='flex items-center justify-between h-14'>
						<motion.a
							href='#home'
							className='text-xl font-bold bg-accent-foreground bg-clip-text text-transparent'
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: 0.6,
								ease: [0.43, 0.13, 0.23, 0.96],
							}}
						>
							JC
						</motion.a>

						<div className='hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2'>
							{menuItems.map((item, index) => (
								<motion.div
									key={item.label}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: 0.7 + index * 0.1,
										ease: [0.43, 0.13, 0.23, 0.96],
									}}
								>
									<Button
										variant='ghost'
										size='sm'
										asChild
										className='font-light text-sm'
									>
										<Link href={item.link}>{item.label}</Link>
									</Button>
								</motion.div>
							))}
						</div>

						<motion.div
							className='hidden md:block'
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: 1.0,
								ease: [0.43, 0.13, 0.23, 0.96],
							}}
						>
							<Button
								variant='ghost'
								size='icon-sm'
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								className='cursor-pointer'
							>
								<motion.div
									key={mounted ? theme : 'mounted'}
									initial={{ rotate: -180, opacity: 0, scale: 0 }}
									animate={{ rotate: 0, opacity: 1, scale: 1 }}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
								>
									{!mounted ? (
										<span className='inline-block w-4 h-4' />
									) : theme === 'dark' ? (
										<Sun className='size-4.5' />
									) : (
										<Moon className='size-4.5' />
									)}
								</motion.div>
							</Button>
						</motion.div>

						{/* Mobile controls - visible only on mobile */}
						<div className='md:hidden flex items-center gap-1'>
							<motion.div
								whileHover={{ rotate: 180 }}
								whileTap={{ scale: 0.9 }}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.7,
									ease: [0.43, 0.13, 0.23, 0.96],
								}}
							>
								<Button
									variant='ghost'
									size='icon-sm'
									onClick={(e) => {
										e.stopPropagation();
										setTheme(theme === 'dark' ? 'light' : 'dark');
										setMenuOpen(false);
									}}
								>
									<motion.div
										key={mounted ? theme : 'mounted'}
										initial={{ rotate: -180, opacity: 0, scale: 0 }}
										animate={{ rotate: 0, opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
									>
										{!mounted ? (
											<span className='inline-block w-4 h-4' />
										) : theme === 'dark' ? (
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
									ease: [0.43, 0.13, 0.23, 0.96],
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
								>
									{menuOpen ? (
										<X className='w-5 h-5' />
									) : (
										<Menu className='w-5 h-5' />
									)}
								</Button>
							</motion.div>
						</div>
					</div>
				</motion.nav>
			</motion.header>

			<StaggeredMenu
				position='right'
				ref={menuRef}
				open={menuOpen}
				items={menuItems}
				socialItems={socialItems}
				displaySocials={true}
				menuButtonColor={theme === 'dark' ? '#fff' : '#000'}
				openMenuButtonColor={theme === 'dark' ? '#000' : '#fff'}
				changeMenuColorOnOpen={true}
				displayItemNumbering={false}
				colors={
					theme === 'dark' ? ['#09090b', '#c182f5'] : ['#f9fafb', '#7016ba']
				}
				logoUrl=''
				accentColor={theme === 'dark' ? '#c182f5' : '#7016ba'}
				textColor={theme === 'dark' ? '#fff' : '#000'}
				borderColor={
					theme === 'dark'
						? 'rgba(193, 130, 245, 0.2)'
						: 'rgba(112, 22, 186, 0.2)'
				}
				panelBackground={theme === 'dark' ? '#09090b' : '#f9fafb'}
				isFixed={true}
				closeOnClickAway={true}
				onMenuOpen={() => setMenuOpen(true)}
				onMenuClose={() => setMenuOpen(false)}
				className='md:hidden'
			/>
		</>
	);
}

export { Header };
