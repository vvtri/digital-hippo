import AddToCartButton from '@/components/AddToCartButton';
import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReel from '@/components/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import { Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
	const validUrls = product.images
		.map(({ image }) => (typeof image === 'string' ? image : image.url))
		.filter(Boolean) as string[];

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

							<div className='mt-4 space-y-6'>
								<p className='text-base text-muted-foreground'>
									{product.description}
								</p>
							</div>

							<div className='mt-6 flex'>
								<Check className='w-6 h-6 flex-shrink-0 text-green-500' />
								<p className='ml-2 text-sm text-muted-foreground'>
									Eligible for instant delivery
								</p>
							</div>
						</section>
					</div>

					<div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
						<div className='aspect-square rounded-lg'>
							<ImageSlider urls={validUrls} />
						</div>
					</div>

					<div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
						<div>
							<div className='mt-10'>
								<AddToCartButton product={product} />
							</div>
							<div className='mt-6 text-center'>
								<div className='group inline-flex text-sm font-medium'>
									<Shield className='w-5 h-5 mr-2 flex-shrink-0 text-gray-400' />
									<span className='text-muted-foreground hover:text-gray-700'>
										30 Days Guarantee
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ProductReel
				href='/products'
				query={{ category: product.category, limit: 4 }}
				title={`Similar ${label}`}
				subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
			/>
		</MaxWidthWrapper>
	);
}
