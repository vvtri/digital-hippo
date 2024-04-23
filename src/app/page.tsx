import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';
import Link from 'next/link';

const perks = [
	{
		name: 'Instant delivery',
		Icon: ArrowDownToLine,
		description:
			'Get your assets delivered to your email in seconds and download them right away.',
	},
	{
		name: 'Guaranteed Quality',
		Icon: CheckCircle,
		description:
			'Every on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer 30-day refund guarantee.',
	},
	{
		name: 'For the Plannet',
		Icon: Leaf,
		description:
			"We've pledged 1% of sales to the preservation and restoration of the nature.",
	},
];

export default function Home() {
	return (
		<>
			<MaxWidthWrapper>
				<div className='mx-auto py-20 max-w-3xl flex flex-col text-center items-center'>
					<h1 className='text-gray-900 text-4xl sm:text-6xl font-bold tracking-tight'>
						Your marketplace for high-quality{' '}
						<span className='text-blue-600'>digital assets</span>.
					</h1>

					<p className='text-lg  max-w-prose mt-6 text-muted-foreground'>
						Welcome to DigitalHippo. Every asset on our platform is verified by
						our team to ensure our highest quality standards.
					</p>

					<div className='mt-6 gap-4 flex flex-col sm:flex-row items-center justify-center'>
						<Link href='products' className={buttonVariants()}>
							Browse Trending
						</Link>

						<Button variant='ghost'>Our quality promise</Button>
					</div>
				</div>
			</MaxWidthWrapper>

			<section className='border-t border-gray-200 bg-gray-50'>
				<MaxWidthWrapper className='py-20'>
					<div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
						{perks.map((perk) => (
							<div
								key={perk.name}
								className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
							>
								<div className='flex justify-center'>
									<div className='h-16 w-16 flex justify-center items-center text-blue-900 bg-blue-100 rounded-full'>
										<perk.Icon className='w-1/3 h-1/3' />
									</div>
								</div>

								<div className='mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0'>
									<h3 className='text-base font-medium text-gray-900'>
										{perk.name}
									</h3>
									<p className='mt-3 text-sm text-muted-foreground'>
										{perk.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
		</>
	);
}
