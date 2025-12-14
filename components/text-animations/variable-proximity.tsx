'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface VariableProximityProps {
	text: string;
	className?: string;
	falloff?: number;
	baseSize?: number;
	maxSize?: number;
}

export function VariableProximity({
	text,
	className = '',
	falloff = 200,
	baseSize = 1,
	maxSize = 2,
}: VariableProximityProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [letterPositions, setLetterPositions] = useState<
		Array<{ x: number; y: number }>
	>([]);

	useEffect(() => {
		const updateLetterPositions = () => {
			if (!containerRef.current) return;

			const letters = containerRef.current.querySelectorAll('.letter');
			const positions = Array.from(letters).map((letter) => {
				const rect = letter.getBoundingClientRect();
				return {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2,
				};
			});
			setLetterPositions(positions);
		};

		updateLetterPositions();
		window.addEventListener('resize', updateLetterPositions);

		return () => {
			window.removeEventListener('resize', updateLetterPositions);
		};
	}, [text]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const calculateScale = (index: number) => {
		if (letterPositions.length === 0) return baseSize;

		const letterPos = letterPositions[index];
		if (!letterPos) return baseSize;

		const distance = Math.sqrt(
			Math.pow(mousePosition.x - letterPos.x, 2) +
				Math.pow(mousePosition.y - letterPos.y, 2)
		);

		const scale = Math.max(
			baseSize,
			maxSize - (distance / falloff) * (maxSize - baseSize)
		);

		return Math.min(scale, maxSize);
	};

	const words = text.split(' ');
	let charIndex = 0;

	return (
		<div ref={containerRef} className={cn('inline-block', className)}>
			{words.map((word, wordIndex) => (
				<span key={wordIndex} className='inline-block whitespace-nowrap'>
					{Array.from(word).map((char, index) => {
						const currentCharIndex = charIndex++;
						return (
							<span
								key={index}
								className='letter inline-block transition-transform duration-200 ease-out'
								style={{
									transform: `scale(${calculateScale(currentCharIndex)})`,
								}}
							>
								{char}
							</span>
						);
					})}
					{wordIndex < words.length - 1 && (
						<span className='letter inline-block'>{'\u00A0'}</span>
					)}
				</span>
			))}
		</div>
	);
}
