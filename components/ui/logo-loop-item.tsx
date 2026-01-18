'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { LogoItem } from '../animations/logo-loop';

interface LogoLoopItemProps {
	item: LogoItem;
}

const LogoLoopItem = memo(function LogoLoopItem({ item }: LogoLoopItemProps) {
	const isNodeItem = 'node' in item;

	const { href, title, ariaLabel } = useMemo(() => {
		const href = item.href || '#';
		const title = item.title || '';
		const ariaLabel = isNodeItem
			? item.ariaLabel || item.title
			: 'alt' in item
			? item.alt || item.title
			: item.title;
		return { href, title, ariaLabel };
	}, [isNodeItem, item]);

	return (
		<div className='group/tech flex flex-col items-center justify-center gap-3 px-4 py-4 overflow-visible'>
			<Link
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={ariaLabel || `Visit ${title} website`}
				className='flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-110 overflow-visible motion-reduce:transition-none motion-reduce:hover:scale-100'
			>
				<div className='flex items-center justify-center w-16 h-16 text-5xl'>
					{isNodeItem && item.node}
				</div>
				<span className='text-xs font-medium text-center text-gray-700 dark:text-gray-300 group-hover/tech:text-foreground transition-colors duration-200 whitespace-nowrap motion-reduce:transition-none'>
					{title}
				</span>
			</Link>
		</div>
	);
});

export { LogoLoopItem };
