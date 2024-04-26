import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

type ProductDetailPageProps = {
	params: {
		productId: string;
	};
};

const BREADCRUMBS = [
	{
		id: 1,
		label: 'Home',
		href: '/',
	},
	{
		id: 2,
		label: 'Products',
		href: '/product',
	},
];

export default async function ProductDetailPage({
	params,
}: ProductDetailPageProps) {
	const { productId } = params;

	const payload = await getPayloadClient();
	const { docs } = await payload.find({
		collection: 'products',
		where: {
			id: { equals: productId },
			approvedForSale: { equals: 'approved' },
		},
	});
	const [product] = docs;
	if (!product) return notFound();

	const label = PRODUCT_CATEGORIES.find(
		(item) => item.value === product.category
	)?.label;

	return (
		<MaxWidthWrapper className='bg-white'>
			<div className='bg-white'>
				<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
					<div className='lg:max-w-lg lg:self-end'>
						<ol className='flex items-center space-x-2'>
							{BREADCRUMBS.map((item, idx) => (
								<li key={item.id}>
									<div className='flex items-center text-sm'>
										<Link
											href={item.href}
											className='font-medium text-sm text-muted-foreground hover:text-gray-900'
										>
											{item.label}
										</Link>

										{idx !== BREADCRUMBS.length - 1 && (
											<svg
												viewBox='0 0 20 20'
												fill='currentColor'
												aria-hidden='true'
												className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'
											>
												<path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
											</svg>
										)}
									</div>
								</li>
							))}
						</ol>

						<div className='mt-4'>
							<h1 className='font-bold text-3xl tracking-tight text-gray-900 sm:text-4xl'>
								{product.name}
							</h1>
						</div>

						<section className='mt-4'>
							<div className='flex items-center'>
								<p className='font-bold text-gray-900'>
									{formatPrice(product.price)}
								</p>

								<p className='ml-4 pl-4 border-l text-muted-foreground border-gray-300'>
									{label}
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
