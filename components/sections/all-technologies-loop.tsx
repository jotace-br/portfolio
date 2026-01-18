'use client';

import { LogoItem, LogoLoop } from '@/components/animations/logo-loop';
import { getAnimationVariants } from '@/constants/animations';
import { TECHNOLOGIES } from '@/constants/technologies';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { LogoLoopItem } from '../ui/logo-loop-item';

interface ControlledTechnologiesGridProps {
	animate?: boolean;
}

// Controlled grid view with navigation (with optional animations)
const ControlledTechnologiesGrid = memo(function ControlledTechnologiesGrid({
	animate = false,
}: ControlledTechnologiesGridProps) {
	const t = useTranslations('technologies');

	const getItemsPerPage = () =>
		typeof window !== 'undefined' && window.innerWidth < 640 ? 4 : 8;

	const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	const [direction, setDirection] = useState(0);
	const totalPages = Math.ceil(TECHNOLOGIES.length / itemsPerPage);

	useEffect(() => {
		const handleResize = () => {
			const newItemsPerPage = getItemsPerPage();
			if (newItemsPerPage !== itemsPerPage) {
				setItemsPerPage(newItemsPerPage);

				const newTotalPages = Math.ceil(TECHNOLOGIES.length / newItemsPerPage);

				if (currentPage >= newTotalPages) {
					setCurrentPage(Math.max(0, newTotalPages - 1));
				}
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [itemsPerPage, currentPage]);

	const visibleTechnologies = TECHNOLOGIES.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	const goToPrevious = () => {
		setDirection(-1);
		setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
	};

	const goToNext = () => {
		setDirection(1);
		setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.8, y: 20 },
		visible: { opacity: 1, scale: 1, y: 0 },
	};

	return (
		<div className='flex items-center gap-2 sm:gap-4 px-2 sm:px-4'>
			<Button
				variant='ghost'
				size='icon'
				onClick={goToPrevious}
				aria-label={t('previousTech')}
				className='shrink-0'
			>
				<ChevronLeft className='size-5' />
			</Button>

			<div className='flex-1 overflow-hidden relative'>
				{animate ? (
					<AnimatePresence mode='wait' custom={direction}>
						<motion.ul
							key={currentPage}
							className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-2 place-items-center'
						>
							{visibleTechnologies.map((tech, index) => (
								<motion.li
									key={`controlled-${currentPage}-${index}`}
									custom={index}
									variants={itemVariants}
									initial='hidden'
									animate='visible'
									transition={{
										delay: index * 0.05,
										duration: 0.3,
										ease: 'easeOut' as const,
									}}
									className='flex items-center justify-center w-full'
									style={{ height: '100px', width: '100px' }}
								>
									<LogoLoopItem item={tech} />
								</motion.li>
							))}
						</motion.ul>
					</AnimatePresence>
				) : (
					<ul className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-2 place-items-center'>
						{visibleTechnologies.map((tech, index) => (
							<li
								key={`static-${currentPage}-${index}`}
								className='flex items-center justify-center w-full'
								style={{ height: '100px', width: '100px' }}
							>
								<LogoLoopItem item={tech} />
							</li>
						))}
					</ul>
				)}
			</div>

			<Button
				variant='ghost'
				size='icon'
				onClick={goToNext}
				aria-label={t('nextTech')}
				className='shrink-0'
			>
				<ChevronRight className='size-5' />
			</Button>
		</div>
	);
});

const AllTechnologiesLoop = memo(function AllTechnologiesLoop() {
	const t = useTranslations('technologies');
	const { shouldReduceMotion } = useReducedMotion();
	const { container, item } = getAnimationVariants(shouldReduceMotion);
	const [isAutoScroll, setIsAutoScroll] = useState(!shouldReduceMotion);

	// Memoize renderItem callback to prevent unnecessary re-renders
	const renderItem = useCallback(
		(logoItem: LogoItem, key: React.Key) => (
			<LogoLoopItem key={key} item={logoItem} />
		),
		[]
	);

	const toggleMode = () => {
		setIsAutoScroll((prev) => !prev);
	};

	return (
		<motion.section
			className='w-full border-y border-gray-200 dark:border-gray-800 py-4 overflow-x-hidden'
			variants={container}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.3 }}
		>
			{/* Toggle button - only show for users without reduced motion preference */}
			{!shouldReduceMotion && (
				<div className='flex justify-end px-4 mb-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={toggleMode}
						aria-label={
							isAutoScroll
								? `${t('listMode')} - ${t('previousTech')}`
								: t('autoScroll')
						}
						className='gap-2 text-xs text-muted-foreground hover:text-foreground'
					>
						{isAutoScroll ? (
							<>
								<Pause className='size-3.5' />
								<span className='hidden sm:inline'>{t('listMode')}</span>
							</>
						) : (
							<>
								<Play className='size-3.5' />
								<span className='hidden sm:inline'>{t('autoScroll')}</span>
							</>
						)}
					</Button>
				</div>
			)}

			<motion.div variants={item} className='min-h-fit'>
				<AnimatePresence mode='wait' initial={false}>
					{isAutoScroll && !shouldReduceMotion ? (
						<motion.div
							key='auto-scroll'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='min-h-fit'
						>
							<LogoLoop
								logos={TECHNOLOGIES}
								speed={60}
								direction='left'
								logoHeight={150}
								gap={32}
								pauseOnHover={false}
								hoverSpeed={10}
								fadeOut
								ariaLabel='Technologies and tools'
								renderItem={renderItem}
							/>
						</motion.div>
					) : (
						<motion.div
							key='controlled'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<ControlledTechnologiesGrid animate={!shouldReduceMotion} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.section>
	);
});

export { AllTechnologiesLoop };
