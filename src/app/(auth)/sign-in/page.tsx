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
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';

export default function SignUpPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isSeller = searchParams.get('as') === 'seller';
	const origin = searchParams.get('origin');

	const continueAsSeller = () => {
		router.push('?as=seller');
	};

	const continueAsBuyer = () => {
		router.replace('/sign-in');
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
		onError(error) {
			if (error.data?.code === 'UNAUTHORIZED')
				return toast.error(`Invalid email or password`);

			return toast.error(`Something went wrong. Please try again.`);
		},

		onSuccess({}) {
			toast.success(`Sign in successfully.`);

			if (origin) return router.push(`/${origin}`);
			else if (isSeller) return router.push(`/sell`);
			else router.push('/');

			router.refresh();
		},
	});

	const onSubmit = (data: TAuthCredentialsValidator) => {
		signIn(data);
	};

	return (
		<div className='container relative pt-20 flex items-center justify-center flex-col lg:px-0'>
			<div className='mx-auto flex items-center justify-center w-full flex-col space-y-6 sm:max-w-[22rem]'>
				<div className='flex flex-col items-center justify-center space-y-2  text-center'>
					<Icons.logo className='w-20 h-20' />
					<h1 className='text-2xl font-bold'>
						Sign in to your {isSeller ? 'seller' : ''} account
					</h1>

					<Link
						href='/sign-up'
						className={buttonVariants({
							variant: 'link',
							className: 'gap-1.5',
						})}
					>
						Don't have an account?
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

							<Button>Sign in</Button>
						</div>
					</form>

					<div className='relative'>
						<div aria-hidden className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>

						<div className='flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								OR
							</span>
						</div>
					</div>

					{isSeller ? (
						<Button
							onClick={continueAsBuyer}
							variant='secondary'
							disabled={isLoading}
						>
							Continue as customer
						</Button>
					) : (
						<Button
							onClick={continueAsSeller}
							variant='secondary'
							disabled={isLoading}
						>
							Continue as seller
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
