import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(
	price: number | `${number}`,
	options: {
		currency?: 'USD' | 'EUR' | 'GBP' | 'BDT' | 'VND';
		notation?: Intl.NumberFormatOptions['notation'];
	} = {}
) {
	const { currency = 'USD', notation = 'compact' } = options;

	let priceNumber = typeof price === 'number' ? price : parseFloat(price);

	const result = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(priceNumber);

	return result;
}
