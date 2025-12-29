'use client';

import { containerVariants, itemVariants } from '@/constants/animations';
import { SOCIAL_MEDIA_LINKS } from '@/constants/social-networks';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type ContactFormData = {
	fullName: string;
	email: string;
	message: string;
};

function Footer() {
	const t = useTranslations('contact');
	const tFooter = useTranslations('footer');
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormData>();

	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({ type: null, message: '' });

	const onSubmit = async (data: ContactFormData) => {
		try {
			setSubmitStatus({ type: null, message: '' });

			// EmailJS configuration
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

			// Send email using EmailJS
			await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: data.fullName,
					from_email: data.email,
					message: data.message,
					to_name: 'Júlio César',
				},
				publicKey
			);

			setSubmitStatus({
				type: 'success',
				message: t('form.successMessage'),
			});
			reset();
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus({
				type: 'error',
				message: t('form.errorMessage'),
			});
		}
	};
	return (
		<section
			id='footer'
			className='w-full py-8 px-4 sm:px-6 lg:px-8'
			aria-labelledby='footer-heading'
		>
			<div className='max-w-6xl mx-auto w-full space-y-4'>
				<motion.section
					id='contact'
					className='w-full py-14 sm:pb-16 rounded-3xl px-4 bg-accent shadow dark:bg-zinc-900 flex flex-col gap-4 items-center justify-center'
					aria-labelledby='contact-heading'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.15 }}
				>
					<Badge variant='secondary'>
						<Dot className='text-green-600 dark:text-green-400 animate-pulse' />{' '}
						{t('badge')}
					</Badge>

					<motion.h2
						id='contact-heading'
						className='text-3xl sm:text-5xl tracking-tight font-bold text-slate-900 dark:text-gray-100 text-center'
						variants={itemVariants}
					>
						{t('title')}
					</motion.h2>

					<motion.p
						className='text-base sm:text-lg text-slate-700 dark:text-gray-400 font-medium leading-relaxed text-center max-w-2xl'
						variants={itemVariants}
					>
						{t('description')}
					</motion.p>

					<motion.div
						className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mt-8'
						variants={containerVariants}
					>
						<motion.div className='flex flex-col gap-3' variants={itemVariants}>
							<div className='p-6 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-gray-700 transition-all hover:shadow-md'>
								<div className='flex items-start gap-4'>
									<div className='p-3 rounded-xl bg-slate-900 dark:bg-gray-100 shrink-0'>
										<MdEmail className='size-6 text-white dark:text-slate-900' />
									</div>
									<div className='flex-1'>
										<p className='text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-1'>
											{t('emailCard.label')}
										</p>
										<Link
											href='mailto:jc10ferreira@gmail.com'
											className='text-base font-bold text-slate-900 dark:text-gray-100 hover:text-slate-700 dark:hover:text-gray-300 break-all'
										>
											jc10ferreira@gmail.com
										</Link>
										<p className='text-xs text-slate-600 dark:text-gray-400 mt-2'>
											{t('emailCard.responseTime')}
										</p>
									</div>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-3 flex-1'>
								<Link
									href='https://linkedin.com/in/juliocesardev'
									target='_blank'
									rel='noopener noreferrer'
									className='p-5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-500 transition-all hover:shadow-md group flex flex-col justify-between'
								>
									<BsLinkedin className='size-6 text-slate-700 dark:text-gray-300 mb-3 group-hover:scale-110 transition-transform' />
									<div>
										<p className='text-sm font-semibold text-slate-900 dark:text-gray-100 mb-1'>
											LinkedIn
										</p>
										<p className='text-xs text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-200'>
											{t('linkedinCard.cta')}
										</p>
									</div>
								</Link>

								<Link
									href='https://github.com/jotace-br'
									target='_blank'
									rel='noopener noreferrer'
									className='p-5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-500 transition-all hover:shadow-md group flex flex-col justify-between'
								>
									<SiGithub className='size-6 text-slate-700 dark:text-gray-300 mb-3 group-hover:scale-110 transition-transform' />
									<div>
										<p className='text-sm font-semibold text-slate-900 dark:text-gray-100 mb-1'>
											GitHub
										</p>
										<p className='text-xs text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-200'>
											{t('githubCard.cta')}
										</p>
									</div>
								</Link>
							</div>
						</motion.div>

						<motion.form
							className='flex flex-col gap-4'
							variants={itemVariants}
							onSubmit={handleSubmit(onSubmit)}
						>
							<Field>
								<FieldLabel htmlFor='fullName'>{t('form.fullName')}</FieldLabel>
								<Input
									id='fullName'
									aria-invalid={!!errors.fullName}
									{...register('fullName', {
										required: t('form.validation.nameRequired'),
										minLength: {
											value: 2,
											message: t('form.validation.nameMinLength'),
										},
									})}
								/>
								{errors.fullName && (
									<FieldError>{errors.fullName.message}</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor='email'>{t('form.email')}</FieldLabel>
								<Input
									id='email'
									type='email'
									aria-invalid={!!errors.email}
									{...register('email', {
										required: t('form.validation.emailRequired'),
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: t('form.validation.emailInvalid'),
										},
									})}
								/>
								{errors.email && (
									<FieldError>{errors.email.message}</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor='message'>{t('form.message')}</FieldLabel>
								<Textarea
									id='message'
									rows={4}
									className='resize-none'
									aria-invalid={!!errors.message}
									{...register('message', {
										required: t('form.validation.messageRequired'),
										minLength: {
											value: 10,
											message: t('form.validation.messageMinLength'),
										},
									})}
								/>
								{errors.message && (
									<FieldError>{errors.message.message}</FieldError>
								)}
							</Field>
							{submitStatus.type && (
								<motion.div
									className={`w-full p-4 rounded-md text-sm ${
										submitStatus.type === 'success'
											? 'bg-green-200/50 text-green-900 dark:bg-green-900/20 dark:text-green-400'
											: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
									}`}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
								>
									{submitStatus.message}
								</motion.div>
							)}
							<Button type='submit' disabled={isSubmitting} className='w-full'>
								{isSubmitting ? t('form.sending') : t('form.submit')}
							</Button>
						</motion.form>
					</motion.div>
				</motion.section>

				<motion.div
					className='flex flex-col sm:flex-row gap-4 justify-between'
					variants={itemVariants}
				>
					<motion.p className='text-sm text-slate-600 dark:text-gray-400'>
						{tFooter('copyright', { year: new Date().getFullYear() })}
					</motion.p>

					<motion.div
						className='flex items-center gap-4'
						variants={itemVariants}
					>
						{SOCIAL_MEDIA_LINKS.map((social) => (
							<Link
								key={social.label}
								href={social.link}
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-900 hover:text-highlight-primary dark:text-gray-100 dark:hover:text-highlight-primary'
							>
								<span className='sr-only'>{social.label}</span>
								{social.icon}
							</Link>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

export { Footer };
