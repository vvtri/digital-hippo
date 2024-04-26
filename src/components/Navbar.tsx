import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import Link from 'next/link';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import Cart from './Cart';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import UserAccountNav from './UserAccountNav';

export default async function Navbar() {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	return (
		<div className='sticky bg-white top-0 inset-x-0 z-50 h-16'>
			<header className='relative bg-white'>
				<MaxWidthWrapper>
					<div className='border-b border-gray-200'>
						<div className='flex h-16 items-center'>
							{/* todo: mobile nav */}

							<div className='ml-4 flex lg:ml-0'>
								<Link href='/'>
									<Icons.logo className='w-10 h-10' />
								</Link>
							</div>

							<div className='hidden z-50 lg:block lg:ml-8 lg:self-stretch'>
								<NavItems />
							</div>

							<div className='ml-auto flex items-center'>
								<div className='hidden lg:flex lg:justify-end lg:items-center lg:flex-1 lg:space-x-6'>
									{user ? (
										<></>
									) : (
										<Link
											href='/sign-in'
											className={buttonVariants({ variant: 'ghost' })}
										>
											Sign in
										</Link>
									)}

									{user ? null : (
										<span className='h-6 w-px bg-gray-200' aria-hidden />
									)}

									{user ? (
										<UserAccountNav user={user} />
									) : (
										<Link
											href='/sign-up'
											className={buttonVariants({ variant: 'ghost' })}
										>
											Create account
										</Link>
									)}

									{user ? <span className='h-6 w-px bg-gray-200' /> : null}

									{user ? null : (
										<div className='flex lg:ml-6'>
											<span className='h-6 w-px bg-gray-200' aria-hidden />
										</div>
									)}

									<div className='ml-4 flow-root'>
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
}
