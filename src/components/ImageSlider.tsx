import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

type ImageSliderProps = {
	urls: string[];
};

export default function ImageSlider({ urls }: ImageSliderProps) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideConfig, setSlideConfig] = useState({
		isBeginning: true,
		isEnd: activeIndex === (urls.length || 0) - 1,
	});

	useEffect(() => {
		swiper?.on('slideChange', ({ activeIndex }) => {
			setActiveIndex(activeIndex);
			setSlideConfig({
				isBeginning: activeIndex === 0,
				isEnd: activeIndex === (urls.length || 0) - 1,
			});
		});
	}, [swiper, urls]);

	const activeStyle =
		'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300';
	const inactiveStyle = 'hidden text-gray-400';

	return (
		<div className='group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl'>
			<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition'>
				<button
					className={cn(activeStyle, 'right-3 transition', {
						[inactiveStyle]: slideConfig.isEnd,
						'hover:bg-primary-300 text-primary-800 opacity-100':
							!slideConfig.isEnd,
					})}
					aria-label='next image'
					onClick={(e) => {
						e.preventDefault();
						swiper?.slideNext();
					}}
				>
					<ChevronRight className='h-4 w-4 text-zinc-700' />
				</button>

				<button
					className={cn(activeStyle, 'left-3 transition', {
						[inactiveStyle]: slideConfig.isBeginning,
						'hover:bg-primary-300 text-primary-800 opacity-100':
							!slideConfig.isBeginning,
					})}
					onClick={(e) => {
						e.preventDefault();
						swiper?.slidePrev();
					}}
				>
					<ChevronLeft className='h-4 w-4 text-zinc-700' />
				</button>
			</div>

			<Swiper
				onSwiper={(swiper) => setSwiper(swiper)}
				spaceBetween={50}
				slidesPerView={1}
				modules={[Pagination]}
				className='h-full w-full'
				pagination={{
					renderBullet: (_, className) =>
						`<span class="rounded-full transition ${className}"></span>`,
				}}
			>
				{urls.map((url, index) => (
					<SwiperSlide key={index} className='-z-10 relative h-full w-full'>
						<Image
							fill
							loading='eager'
							className='-z-10 h-full w-full object-cover object-center'
							alt='image'
							src={url}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
