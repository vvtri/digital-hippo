'use client';

import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { User } from '@/payload-types';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

type UserAccountNavProps = {
	user: User;
};

export default function UserAccountNav({ user }: UserAccountNavProps) {
	const { signOut } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='overflow-visible'>
				<Button variant='ghost' className='relative' size='sm'>
					My Account
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='bg-white w-60' align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-0.5 leading-none'>
						<p className='font-medium text-black text-sm'>{user.email}</p>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href='seller' className='cursor-pointer'>
						Seller Dashboard
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem className='cursor-pointer' onClick={signOut}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
