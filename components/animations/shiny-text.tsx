import { cn } from '@/lib/utils';
import React from 'react';

interface ShimmerTextProps {
	text: string;
	as?: 'p' | 'span' | 'div';
	className?: string;
	disabled?: boolean;
}

const ShimmerText: React.FC<ShimmerTextProps> = ({
	text,
	as = 'p',
	className = '',
	disabled = false,
}) => {
	const Tag = as;

	return (
		<Tag
			aria-hidden={disabled}
			className={cn('shimmer inline-block leading-none', className)}
		>
			{text}
		</Tag>
	);
};

export default ShimmerText;
