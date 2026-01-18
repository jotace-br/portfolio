import { type Variants } from 'framer-motion';

export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

export const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	},
};

// Reduced motion variants - no movement, only opacity changes
export const containerVariantsReduced: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0,
			delayChildren: 0,
		},
	},
};

export const itemVariantsReduced: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.01,
		},
	},
};

// Helper function to get variants based on reduced motion preference
export function getAnimationVariants(shouldReduceMotion: boolean) {
	return {
		container: shouldReduceMotion
			? containerVariantsReduced
			: containerVariants,
		item: shouldReduceMotion ? itemVariantsReduced : itemVariants,
	};
}
