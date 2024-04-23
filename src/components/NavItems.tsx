'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;

	return (
		<div className='flex gap-4 h-full '>
			{PRODUCT_CATEGORIES.map((item, idx) => {
				const handleOpen = () => {
					if (activeIndex === idx) setActiveIndex(null);
					else setActiveIndex(idx);
				};
				const isOpen = activeIndex === idx;

        console.log('activeIndex', activeIndex)
        console.log('isOpen', isOpen)

				return (
					<NavItem
						key={item.value}
						category={item}
						handleOpen={handleOpen}
						isAnyOpen={isAnyOpen}
						isOpen={isOpen}
					/>
				);
			})}
		</div>
	);
}
