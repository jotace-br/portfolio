import { cn } from '@/lib/utils';
import React, { memo } from 'react';

interface ShimmerTextProps {
	text: string;
	as?: 'p' | 'span' | 'div';
	className?: string;
	disabled?: boolean;
}

const ShimmerText: React.FC<ShimmerTextProps> = memo(function ShimmerText({
	text,
	as = 'p',
	className = '',
	disabled = false,
}) {
	const Tag = as;

	return (
		<Tag
			aria-hidden={disabled}
			className={cn(
				'shimmer inline-block leading-none motion-reduce:[background:none] motion-reduce:text-inherit',
				className
			)}
		>
			{text}
		</Tag>
	);
});

export default ShimmerText;
