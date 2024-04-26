'use client';

import { trpc } from '@/trpc/client';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';

type VerifyEmailProps = {
	token: string;
};

export default function VerifyEmail({ token }: VerifyEmailProps) {
	const { data, isError, isLoading, error } = trpc.auth.verifyEmail.useQuery({
		token,
	});

	if (error) {
		return (
			<div className='flex items-center justify-center flex-col gap-2'>
				<XCircle className='w-10 h-10 text-red-500' />

				<h3 className='text-lg font-semibold'> There was an error</h3>
				<span className='text-muted-foreground text-sm'>
					The token is invalid or might be expired. Please try again
				</span>
			</div>
		);
	}

	if (data?.success) {
		return (
			<div className='flex flex-col items-center justify-center gap-2'>
				<div className='relative text-muted-foreground h-60 w-60 mb-4'>
					<Image src='/hippo-email-sent.png' fill alt='Email sent' />
				</div>

				<h3 className='text-xl font-semibold'>You're all set!</h3>
				<span className='text-muted-foreground'>
					Thank you for verifying your email.
				</span>

				<Link href='/sign-in' className={buttonVariants({ className: 'mt-4' })}>
					Sign in
				</Link>
			</div>
		);
	}

	return (
		<div className='flex items-center justify-center flex-col gap-2'>
			<Loader2 className='animate-spin w-10 h-10 text-zinc-300' />

			<h3 className='text-lg font-semibold'>Verifying...</h3>
			<span className='text-muted-foreground text-sm'>
				This won't take long
			</span>
		</div>
	);
}
