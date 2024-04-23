'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from './ui/button';
import { PRODUCT_CATEGORIES } from '@/config';
import { ChevronDown } from 'lucide-react';

type NavItemProps = {
	category: (typeof PRODUCT_CATEGORIES)[number];
	handleOpen: () => void;
	isOpen: boolean;
	isAnyOpen: boolean;
};

export default function NavItem(props: NavItemProps) {
	const { category, handleOpen, isAnyOpen, isOpen } = props;

	return (
		<div className='flex '>
			<div className='relative flex items-center'>
				<Button
					className='gap-1.5'
					onClick={handleOpen}
					variant={isOpen ? 'secondary' : 'ghost'}
				>
					{category.label}
					<ChevronDown
						className={cn('h-4 w-4 transition-all text-muted-foreground', {
							'-rotate-180': isOpen,
						})}
					/>
				</Button>
			</div>
		</div>
	);
}
