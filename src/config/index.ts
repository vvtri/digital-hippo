export const PRODUCT_CATEGORIES = [
	{
		label: 'UI Kits',
		value: 'ui-kits',
		featured: [
			{
				name: 'Editor Picks',
				href: '#',
				imageSrc: '/nav/ui_kits/mixed.jpg',
			},
			{
				name: 'New Arrivals',
				href: '#',
				imageSrc: '/nav/ui-kits/blue.jpg',
			},
			{
				name: 'Bestsellers',
				href: '#',
				imageSrc: '/nav/ui-kits/blue.jpg',
			},
		],
	},
	{
		label: 'Icons',
		value: 'icons',
		featured: [
			{
				name: 'Editor Picks',
				href: '#',
				imageSrc: '/nav/icons/picks.jpg',
			},
			{
				name: 'New Arrivals',
				href: '#',
				imageSrc: '/nav/icons/new.jpg',
			},
			{
				name: 'Bestsellers',
				href: '#',
				imageSrc: '/nav/icons/bestsellers.jpg',
			},
		],
	},
] as const;
