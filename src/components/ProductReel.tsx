'use client';

import { TQueryValidator } from '@/lib/validators/query-validator';
import { Product } from '@/payload-types';
import { trpc } from '@/trpc/client';
import Link from 'next/link';
import React from 'react';
import ProductListing from './ProductListing';

type ProductReelProps = {
	title: string;
	subtitle?: string;
	href?: string;
	query: TQueryValidator;
};

const FALLBACK_LIMIT = 4;

export default function ProductReel(props: ProductReelProps) {
	const { title, subtitle, href, query } = props;

	const { data, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
		{
			limit: query?.limit ?? FALLBACK_LIMIT,
			query,
		},
		{
			getNextPageParam: (lastPage) => {
				lastPage.nextPage;
			},
		}
	);

	const products = data?.pages.flatMap((page) => page.items);
	let map: (Product | null)[] = [];

	if (products?.length) {
		map = products;
	} else {
		map = new Array<null>(query.limit || FALLBACK_LIMIT);
	}

	return (
		<section className='py-12'>
			<div className='md:flex md:items-center md:justify-between mb-4 '>
				<div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
					{!!title && (
						<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
							{title}
						</h1>
					)}

					{!!subtitle && (
						<p className='text-sm text-muted-foreground mt-2'>{subtitle}</p>
					)}
				</div>

				{!!href && (
					<Link
						href={href}
						className='hidden md:block text-blue-600 hover:text-blue-500 text-sm font-medium'
					>
						Shop the collection &rarr;
					</Link>
				)}
			</div>

			<div className='relative'>
				<div className='flex w-full mt-6 items-center'>
					<div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4  lg:gap-x-8'>
						{map.map((product, i) => (
							<ProductListing
								key={product?.id || i}
								product={product}
								index={i}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
