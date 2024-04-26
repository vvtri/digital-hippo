'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;
	const navRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside({ ref: navRef, handler: () => setActiveIndex(null) });

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveIndex(null);
		};

		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, []);

	return (
		<div className='flex gap-4 h-full' ref={navRef}>
			{PRODUCT_CATEGORIES.map((item, idx) => {
				const handleOpen = () => {
					if (activeIndex === idx) setActiveIndex(null);
					else setActiveIndex(idx);
				};
				const isOpen = activeIndex === idx;

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
