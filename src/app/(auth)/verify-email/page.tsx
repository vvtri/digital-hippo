import VerifyEmail from '@/components/VerifyEmail';
import Image from 'next/image';
import React from 'react';

type VerifyEmailPageProps = {
	searchParams: {
		token?: string | string[];
		to?: string | string[];
	};
};

export default function VerifyEmailPage({
	searchParams,
}: VerifyEmailPageProps) {
	const token = searchParams.token;
	const toEmail = searchParams.to;

	return (
		<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
			<div className='flex w-full items-center justify-center flex-col sm:max-w-[26rem] mx-auto'>
				{typeof token === 'string' ? (
					<VerifyEmail token={token} />
				) : (
					<div className='flex flex-col items-center justify-center space-y-1'>
						<div className='relative mb-4 h-60 w-60 text-muted-foreground'>
							<Image src='/hippo-email-sent.png' alt='Hippo sent email' fill />
						</div>

						<h3 className='text-2xl font-semibold'>Check your email</h3>

						<p className='text-sm text-muted-foreground'>
							{toEmail ? (
								<>
									We've sent a verification link to{' '}
									<span className='font-semibold'>{toEmail}</span>.
								</>
							) : (
								`We've sent a verification link to your email.`
							)}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
