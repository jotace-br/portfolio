import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

interface ProjectBannerProps {
	banner: string;
	name: string;
	liveUrl?: string;
	githubUrl?: string;
}

export function ProjectBanner({
	banner,
	name,
	liveUrl,
	githubUrl,
}: ProjectBannerProps) {
	return (
		<div className='relative w-full h-100 sm:h-125 lg:h-150 overflow-hidden'>
			<Image
				src={banner}
				alt={`${name} banner`}
				fill
				className='object-cover'
				priority
				sizes='100vw'
			/>
			<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent' />

			<div className='absolute inset-x-0 bottom-0'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
					<div className='flex justify-end gap-3'>
						{liveUrl && (
							<Button
								asChild
								size='lg'
								className='bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl'
							>
								<Link href={liveUrl} target='_blank' rel='noopener noreferrer'>
									<ExternalLink size={18} />
									View Live Demo
								</Link>
							</Button>
						)}
						{githubUrl && (
							<Button
								asChild
								size='lg'
								variant='outline'
								className='bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl'
							>
								<Link
									href={githubUrl}
									target='_blank'
									rel='noopener noreferrer'
								>
									<SiGithub size={18} />
									View on GitHub
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
