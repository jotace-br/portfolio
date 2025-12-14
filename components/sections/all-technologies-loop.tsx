'use client';

import { LogoItem, LogoLoop } from '@/components/animations/logo-loop';
import { containerVariants, itemVariants } from '@/constants/animations';
import { technologies } from '@/constants/technologies';
import { motion } from 'framer-motion';
import { LogoLoopItem } from '../ui/logo-loop-item';

function AllTechnologiesLoop() {
	return (
		<motion.section
			className='w-full border-y border-gray-200 dark:border-gray-800 py-16 overflow-x-hidden'
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.3 }}
		>
			<motion.div
				className='container mx-auto px-4 mb-12'
				variants={itemVariants}
			>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-2'>
					Technologies & Tools
				</h2>
			</motion.div>
			<motion.div variants={itemVariants}>
				<LogoLoop
					logos={technologies}
					speed={60}
					direction='left'
					logoHeight={150}
					gap={32}
					pauseOnHover={false}
					hoverSpeed={10}
					fadeOut
					ariaLabel='Technologies and tools'
					renderItem={(item: LogoItem, key: React.Key) => (
						<LogoLoopItem key={key} item={item} />
					)}
				/>
			</motion.div>
		</motion.section>
	);
}

export { AllTechnologiesLoop };
