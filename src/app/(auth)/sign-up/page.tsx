'use client';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError(error) {
			if (error.data?.code === 'CONFLICT')
				return toast.error(`The email is already in use. Sign in instead?`);

			if (error instanceof ZodError) {
				return toast.error(error.issues[0].message);
			}

			return toast.error(`Something went wrong. Please try again.`);
		},

		onSuccess({ sentToEmail }) {
			toast.success(`Verification email is already sent to ${sentToEmail}.`);
			router.push(`/verify-email?to=${sentToEmail}`);
		},
	});

	const onSubmit = (data: TAuthCredentialsValidator) => {
		mutate(data);
	};

	return (
		<div className='container relative pt-20 flex items-center justify-center flex-col lg:px-0'>
			<div className='mx-auto flex items-center justify-center w-full flex-col space-y-6 sm:max-w-[22rem]'>
				<div className='flex flex-col items-center justify-center space-y-2  text-center'>
					<Icons.logo className='w-20 h-20' />
					<h1 className='text-2xl font-bold'>Create an account</h1>

					<Link
						href='/sign-in'
						className={buttonVariants({
							variant: 'link',
							className: 'gap-1.5',
						})}
					>
						Already have an account? Sign-in
						<ArrowRight className='h-4 w-4' />
					</Link>
				</div>

				<div className='grid gap-6 w-full'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-2 py-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									{...register('email')}
									id='email'
									placeholder='you@example.com'
									className={cn({
										'focus-visible:ring-red-500': errors.email,
									})}
								/>

								{errors.email && (
									<p className='text-sm text-red-500'>{errors.email.message}</p>
								)}
							</div>

							<div className='grid gap-2 py-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									{...register('password')}
									id='password'
									type='password'
									placeholder='password'
									className={cn({
										'focus-visible:ring-red-500': errors.password,
									})}
								/>

								{errors.password && (
									<p className='text-sm text-red-500'>
										{errors.password.message}
									</p>
								)}
							</div>

							<Button>Sign up</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
