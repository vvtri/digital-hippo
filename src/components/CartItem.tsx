import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type CartItemProps = {
	product: Product;
};

export default function CartItem({ product }: CartItemProps) {
	const { removeItem } = useCart();
	const { image } = product.images[0];



	const label = PRODUCT_CATEGORIES.find(
		(item) => item.value === product.category
	)?.label;
	const validUrls = product.images
		.map(({ image }) => (typeof image === 'string' ? image : image.url))
		.filter(Boolean) as string[];

	return (
		<div className='space-y-3 py-2'>
			<div className='flex items-center justify-between gap-4'>
				<div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
					{typeof image !== 'string' && image.url ? (
						<Image src={image.url} fill alt='product image' />
					) : (
						<div className='flex h-full items-center bg-secondary'>
							<ImageIcon
								aria-hidden
								className='w-4 h-4 text-muted-foreground'
							/>
						</div>
					)}
				</div>

				<div className='w-full flex flex-col self-start'>
					<span className='line-clamp-1 text-sm font-medium mb-1 '>
						{product.name}
					</span>

					<span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
						{label}
					</span>

					<div className='mt-4 text-sm text-muted-foreground'>
						<button
							onClick={() => removeItem(product.id)}
							className='flex items-center gap-0.5'
						>
							<X className='w-3 h-4' />
							Remove
						</button>
					</div>
				</div>

				<div className='flex flex-col space-y-1 font-medium self-stretch'>
					<span className='ml-auto line-clamp-1 text-sm'>
						{formatPrice(product.price)}
					</span>
				</div>
			</div>
		</div>
	);
}
