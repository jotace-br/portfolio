'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { JobExperience } from '../sections/work-experience';

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			className={cn('border-b dark:border-gray-900', className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className='flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(
					'focus-visible:border-ring cursor-pointer focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
					className
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot='accordion-content'
			className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
			{...props}
		>
			<div className={cn('pt-0 pb-4', className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

function ExpandableAccordionDetails({ item }: { item: JobExperience }) {
	return (
		<AccordionItem value={item.id} className='px-4'>
			<AccordionTrigger className='hover:no-underline'>
				<div className='flex items-center gap-4 w-full'>
					<div className='relative size-14 rounded-lg overflow-hidden shrink-0'>
						<Image
							src={item.logo}
							alt={`${item.company} logo`}
							fill
							quality={100}
							className='object-contain'
						/>
					</div>
					<div className='flex flex-col items-start text-left flex-1 min-w-0'>
						<h3 className='font-semibold text-slate-900 dark:text-gray-100 truncate w-full text-pretty'>
							{item.role}
						</h3>
						<Link
							href={item.companyLink}
							target='_blank'
							rel='noopener noreferrer'
							className='text-sm text-slate-600 dark:text-gray-400 truncate hover:underline w-fit text-pretty line-clamp-1'
						>
							{item.company}
						</Link>
						<p className='text-xs text-slate-500 dark:text-gray-500'>
							{item.period}
						</p>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<ul className='space-y-2 mt-4 list-disc list-inside'>
					{item.achievements.map((achievement, index) => (
						<li
							key={index}
							className='text-sm text-gray-900 dark:text-gray-400 marker:text-slate-900 dark:marker:text-gray-400'
						>
							{achievement}
						</li>
					))}
				</ul>
			</AccordionContent>
		</AccordionItem>
	);
}

export {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	ExpandableAccordionDetails,
};
