'use client';

import ShinyText from '@/components/animations/shiny-text';
import { containerVariants, itemVariants } from '@/constants/animations';
import { FAQ_ITEMS } from '@/constants/faq';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';

function Faq() {
	return (
		<section
			id='faq'
			className='w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8'
			aria-labelledby='faq-heading'
		>
			<div className='max-w-6xl mx-auto w-full'>
				<motion.div
					className='flex flex-col gap-6'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<motion.div className='flex flex-col gap-2' variants={itemVariants}>
						<motion.div
							className='flex w-fit items-center gap-2 text-highlight-primary'
							variants={itemVariants}
						>
							<Sparkle size={16} />
							<ShinyText
								text='FAQ'
								className='word-spacing text-sm uppercase leading-none text-highlight-primary font-semibold'
							/>
						</motion.div>

						<motion.h2
							id='faq-heading'
							className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100'
							variants={itemVariants}
						>
							Frequently Asked Questions
						</motion.h2>
					</motion.div>

					<motion.div
						className='flex w-full flex-col gap-4'
						variants={itemVariants}
					>
						<Accordion type='single' collapsible className='w-full'>
							<AnimatePresence mode='popLayout'>
								{FAQ_ITEMS.map((faq) => (
									<motion.div
										key={faq.id}
										initial={{ scale: 0.8, opacity: 0, y: 20 }}
										animate={{ scale: 1, opacity: 1, y: 0 }}
										exit={{ scale: 0.8, opacity: 0, y: -20 }}
										transition={{
											duration: 0.3,
											delay: 0,
											ease: [0.32, 0.72, 0, 1],
										}}
									>
										<AccordionItem value={faq.id}>
											<AccordionTrigger className='hover:no-underline'>
												{faq.question}
											</AccordionTrigger>
											<AccordionContent>{faq.answer}</AccordionContent>
										</AccordionItem>
									</motion.div>
								))}
							</AnimatePresence>
						</Accordion>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

export { Faq };
