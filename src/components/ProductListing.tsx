'use client';

import { Product } from '@/payload-types';
import React, { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/config';
import ImageSlider from './ImageSlider';

type ProductListingProps = {
	product: Product | null;
	index: number;
};

export default function ProductListing(props: ProductListingProps) {
	const { index, product } = props;

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, index * 75);

		return () => clearTimeout(timer);
	}, [index]);

	if (!product || !isVisible) return <ProductPlaceholder />;

	const label = PRODUCT_CATEGORIES.find(
		(item) => item.value === product.category
	)?.label;
	const validUrls = product.images
		.map(({ image }) => (typeof image === 'string' ? image : image.url))
		.filter(Boolean) as string[];

	return (
		<Link
			href={`/products/${product.id}`}
			className={cn('invisible h-full w-full cursor-pointer group/main', {
				'visible animate-in fade-in': isVisible,
			})}
		>
			<div className='flex flex-col w-full'>
				<ImageSlider urls={validUrls} />

				<h3 className='text-sm font-medium text-gray-700 mt-4'>
					{product.name}
				</h3>
				<p className='mt-1 text-sm text-gray-500'>{label}</p>

				<p className='mt-1 font-medium text-sm text-gray-900'>
					{formatPrice(product.price)}
				</p>
			</div>
		</Link>
	);
}

export function ProductPlaceholder() {
	return (
		<div className='flex flex-col w-full'>
			<div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
				<Skeleton className='h-full w-full' />
			</div>

			<Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
			<Skeleton className='mt-4 w-16 h-4 rounded-lg' />
			<Skeleton className='mt-4 w-12 h-4 rounded-lg' />
		</div>
	);
}
