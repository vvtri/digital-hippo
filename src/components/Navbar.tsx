import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import Link from 'next/link';
import NavItems from './NavItems';

export default function Navbar() {
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
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
}
