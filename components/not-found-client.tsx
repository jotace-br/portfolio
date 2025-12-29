'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowLeft,
	Ghost,
	House,
	PartyPopper,
	RefreshCw,
	Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface NotFoundClientProps {
	locale: string;
	homeUrl: string;
	translations: {
		goBack: string;
		tryAgain: string;
		backHome: string;
		clickHint: string;
		ghostHint: string;
		clickedGhost: string;
		clickedGhostPlural: string;
		persistent: string;
		stopNow: string;
		suggestions: string;
		suggestionItems: {
			petCat: string;
			touchGrass: string;
			hydrate: string;
			stretch: string;
			contemplate: string;
		};
		funnyMessages: string[];
		funnyExcuses: string[];
	};
}

interface SparkleData {
	id: number;
	initialX: number;
	initialY: number;
	animateY1: number;
	animateY2: number;
	duration: number;
	delay: number;
}

const STATIC_SPARKLES: SparkleData[] = [
	{
		id: 0,
		initialX: 15,
		initialY: 20,
		animateY1: 45,
		animateY2: 78,
		duration: 4.2,
		delay: 0.3,
	},
	{
		id: 1,
		initialX: 82,
		initialY: 55,
		animateY1: 12,
		animateY2: 88,
		duration: 3.7,
		delay: 1.1,
	},
	{
		id: 2,
		initialX: 45,
		initialY: 85,
		animateY1: 33,
		animateY2: 65,
		duration: 4.8,
		delay: 0.8,
	},
	{
		id: 3,
		initialX: 28,
		initialY: 42,
		animateY1: 72,
		animateY2: 28,
		duration: 3.3,
		delay: 1.5,
	},
	{
		id: 4,
		initialX: 68,
		initialY: 15,
		animateY1: 55,
		animateY2: 92,
		duration: 4.5,
		delay: 0.1,
	},
	{
		id: 5,
		initialX: 92,
		initialY: 72,
		animateY1: 18,
		animateY2: 48,
		duration: 3.9,
		delay: 1.8,
	},
	{
		id: 6,
		initialX: 38,
		initialY: 8,
		animateY1: 82,
		animateY2: 35,
		duration: 4.1,
		delay: 0.6,
	},
	{
		id: 7,
		initialX: 55,
		initialY: 62,
		animateY1: 25,
		animateY2: 75,
		duration: 3.5,
		delay: 1.3,
	},
	{
		id: 8,
		initialX: 8,
		initialY: 35,
		animateY1: 68,
		animateY2: 15,
		duration: 4.7,
		delay: 0.4,
	},
	{
		id: 9,
		initialX: 75,
		initialY: 88,
		animateY1: 42,
		animateY2: 58,
		duration: 3.2,
		delay: 1.9,
	},
	{
		id: 10,
		initialX: 22,
		initialY: 68,
		animateY1: 85,
		animateY2: 22,
		duration: 4.4,
		delay: 0.9,
	},
	{
		id: 11,
		initialX: 88,
		initialY: 28,
		animateY1: 55,
		animateY2: 82,
		duration: 3.6,
		delay: 1.6,
	},
	{
		id: 12,
		initialX: 48,
		initialY: 95,
		animateY1: 15,
		animateY2: 68,
		duration: 4.0,
		delay: 0.2,
	},
	{
		id: 13,
		initialX: 62,
		initialY: 45,
		animateY1: 78,
		animateY2: 32,
		duration: 3.8,
		delay: 1.4,
	},
	{
		id: 14,
		initialX: 5,
		initialY: 78,
		animateY1: 38,
		animateY2: 92,
		duration: 4.6,
		delay: 0.7,
	},
];

export function NotFoundClient({ translations, homeUrl }: NotFoundClientProps) {
	const router = useRouter();
	const [message, setMessage] = useState(translations.funnyMessages[0]);
	const [excuse, setExcuse] = useState(translations.funnyExcuses[0]);
	const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 });
	const [clicks, setClicks] = useState(0);
	const initializedRef = useRef(false);

	useEffect(() => {
		if (initializedRef.current) return;
		initializedRef.current = true;

		const randomMessage =
			translations.funnyMessages[
				Math.floor(Math.random() * translations.funnyMessages.length)
			];
		const randomExcuse =
			translations.funnyExcuses[
				Math.floor(Math.random() * translations.funnyExcuses.length)
			];

		const raf = requestAnimationFrame(() => {
			setMessage(randomMessage);
			setExcuse(randomExcuse);
		});

		return () => cancelAnimationFrame(raf);
	}, [translations.funnyMessages, translations.funnyExcuses]);

	const handleGhostClick = () => {
		setClicks(clicks + 1);
		setMessage(
			translations.funnyMessages[
				Math.floor(Math.random() * translations.funnyMessages.length)
			]
		);
		setExcuse(
			translations.funnyExcuses[
				Math.floor(Math.random() * translations.funnyExcuses.length)
			]
		);

		setGhostPosition({
			x: (Math.random() - 0.5) * 20,
			y: (Math.random() - 0.5) * 20,
		});
	};

	const handleRefresh = () => {
		router.refresh();
	};

	const handleGoBack = () => {
		router.back();
	};

	const handleGoHome = () => {
		router.push(homeUrl);
	};

	const getClickMessage = () => {
		const template =
			clicks === 1
				? translations.clickedGhost
				: translations.clickedGhostPlural;

		return template.replace('{count}', String(clicks));
	};

	return (
		<main className='min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative'>
			{STATIC_SPARKLES.map((sparkle) => (
				<motion.div
					key={sparkle.id}
					className='absolute pointer-events-none'
					initial={{
						x: `${sparkle.initialX}vw`,
						y: `${sparkle.initialY}vh`,
						scale: 0,
					}}
					animate={{
						y: [`${sparkle.animateY1}vh`, `${sparkle.animateY2}vh`],
						scale: [0, 1, 0],
						rotate: [0, 360],
					}}
					transition={{
						duration: sparkle.duration,
						repeat: Infinity,
						delay: sparkle.delay,
					}}
				>
					<Sparkles className='w-4 h-4 text-highlight-primary opacity-50' />
				</motion.div>
			))}

			<div className='max-w-2xl w-full relative z-10'>
				<motion.div
					initial={{ scale: 0.8, opacity: 0, y: 50 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
				>
					<Card className='border-2 border-highlight-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm'>
						<CardContent className='p-8 md:p-12'>
							<div className='flex items-center justify-center gap-4 mb-8'>
								<motion.span
									className='text-8xl md:text-9xl font-black text-highlight-primary select-none'
									animate={{
										scale: [1, 1.05, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									4
								</motion.span>

								<motion.div
									className='cursor-pointer relative'
									animate={{
										y: [0, -20, 0],
										rotate: [0, ghostPosition.x, 0],
										x: ghostPosition.x,
									}}
									transition={{
										y: {
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
										},
										rotate: {
											duration: 0.5,
										},
										x: {
											duration: 0.5,
										},
									}}
									onClick={handleGhostClick}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
								>
									<Ghost className='w-20 h-20 md:w-24 md:h-24 text-highlight-primary' />
									{clicks > 5 && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className='absolute -top-8 -right-8'
										>
											<PartyPopper className='w-8 h-8 text-yellow-500' />
										</motion.div>
									)}
								</motion.div>

								<motion.span
									className='text-8xl md:text-9xl font-black text-highlight-primary select-none'
									animate={{
										scale: [1, 1.05, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 0.5,
									}}
								>
									4
								</motion.span>
							</div>

							<motion.div
								key={message}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='text-center mb-6'
							>
								<h1 className='text-2xl md:text-3xl font-black text-foreground mb-4'>
									{message}
								</h1>
								<p className='text-foreground/90 text-lg'>{excuse}</p>
							</motion.div>

							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								className='flex justify-center mb-6'
							>
								<Badge variant='secondary' className='text-sm'>
									{getClickMessage()}
									{clicks > 10 && clicks <= 20 && ` ${translations.persistent}`}
									{clicks > 20 && ` ${translations.stopNow}`}
								</Badge>
							</motion.div>

							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'>
								<Button
									size='lg'
									className='gap-2 bg-highlight-primary/75 transition-colors duration-150 hover:bg-highlight-primary/90 text-white'
									onClick={handleGoBack}
								>
									<ArrowLeft className='w-5 h-5' />
									{translations.goBack}
								</Button>

								<Button
									size='lg'
									variant='outline'
									className='gap-2 border-2 border-highlight-primary/30 hover:bg-highlight-primary/10'
									onClick={handleRefresh}
								>
									<RefreshCw className='w-5 h-5' />
									{translations.tryAgain}
								</Button>

								<Button
									size='lg'
									variant='outline'
									className='gap-2 border-2 border-muted-foreground/30 hover:bg-muted'
									onClick={handleGoHome}
								>
									<House className='w-5 h-5' />
									{translations.backHome}
								</Button>
							</div>

							<motion.p
								className='text-center mt-8 text-sm text-foreground/85 italic'
								animate={{ opacity: [0.85, 1, 0.85] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								{translations.ghostHint}
							</motion.p>

							<div className='mt-8 pt-6 border-t border-border'>
								<p className='text-center text-sm text-foreground/75 mb-3'>
									{translations.suggestions}
								</p>
								<div className='flex flex-wrap gap-2 justify-center'>
									<Badge variant='outline'>
										{translations.suggestionItems.petCat}
									</Badge>
									<Badge variant='outline'>
										{translations.suggestionItems.touchGrass}
									</Badge>
									<Badge variant='outline'>
										{translations.suggestionItems.hydrate}
									</Badge>
									<Badge variant='outline'>
										{translations.suggestionItems.stretch}
									</Badge>
									<Badge variant='outline'>
										{translations.suggestionItems.contemplate}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{clicks === 0 && (
					<motion.div
						className='absolute -top-20 left-1/2 transform -translate-x-1/2'
						animate={{
							y: [0, -10, 0],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<div className='bg-card rounded-full px-4 py-2 shadow-lg border-2 border-highlight-primary/20'>
							<p className='text-sm text-foreground'>
								{translations.clickHint} 👇
							</p>
						</div>
					</motion.div>
				)}
			</div>
		</main>
	);
}
