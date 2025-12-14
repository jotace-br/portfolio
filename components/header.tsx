'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const menuItems = [
	{ name: 'About', href: '#about' },
	{ name: 'Work', href: '#work' },
	{ name: 'Contact', href: '#contact' },
];

function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);

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

	return (
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
						className='text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
					>
						JC
					</motion.a>

					<div className='hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2'>
						{menuItems.map((item, index) => (
							<motion.div
								key={item.name}
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
									<Link href={item.href}>{item.name}</Link>
								</Button>
							</motion.div>
						))}
					</div>

					<motion.div
						className='hidden md:block'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
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
									<Sun className='size-4.5 text-yellow-500' />
								) : (
									<Moon className='size-4.5' />
								)}
								</motion.div>
						</Button>
					</motion.div>					<div className='md:hidden flex items-center gap-1'>
						<motion.div
							whileHover={{ rotate: 180 }}
							whileTap={{ scale: 0.9 }}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
						>
							<Button
								variant='ghost'
								size='icon-sm'
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
										<Sun className='size-4.5 text-yellow-500' />
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
							transition={{ duration: 0.5, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
						>
							<Button
								variant='ghost'
								size='icon-sm'
								onClick={() => setIsOpen(!isOpen)}
							>
								{isOpen ? (
									<X className='w-5 h-5' />
								) : (
									<Menu className='w-5 h-5' />
								)}
							</Button>
						</motion.div>
					</div>
				</div>

				<motion.div
					initial={false}
					animate={{
						height: isOpen ? 'auto' : 0,
						opacity: isOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='md:hidden overflow-hidden'
				>
					<div className='py-3 space-y-0.5'>
						{menuItems.map((item, index) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								whileHover={{ x: 8 }}
							>
								<Button
									variant='ghost'
									asChild
									className='w-full justify-start font-light text-sm h-10'
									onClick={() => setIsOpen(false)}
								>
									<Link href={item.href}>{item.name}</Link>
								</Button>
							</motion.div>
						))}
					</div>
				</motion.div>
			</motion.nav>
		</motion.header>
	);
}

export { Header };
