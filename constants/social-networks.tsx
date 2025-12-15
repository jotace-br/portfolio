import { BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';

export const SOCIAL_MEDIA_LINKS = [
	{
		label: 'LinkedIn',
		link: 'https://linkedin.com/in/juliocesardev',
		icon: <BsLinkedin className='size-5' />,
	},
	{
		label: 'GitHub',
		link: 'https://github.com/jotace-br',
		icon: <SiGithub className='size-5' />,
	},
	{
		label: 'Email',
		link: 'mailto:jc10ferreira@gmail.com',
		icon: <MdEmail className='size-5' />,
	},
];
