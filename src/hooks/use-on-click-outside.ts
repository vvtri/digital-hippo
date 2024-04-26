import { RefObject, useEffect } from 'react';

type UseOnClickOutsideProps<T> = {
	handler: (event: DocumentEventMap['mousedown' | 'touchstart']) => any;
	ref: RefObject<T>;
};

export const useOnClickOutside = <T extends HTMLElement>(
	props: UseOnClickOutsideProps<T>
) => {
	const { handler, ref } = props;

	useEffect(() => {
		const listener = (event: DocumentEventMap['mousedown' | 'touchstart']) => {
			if (!ref.current) return;
			if (ref.current.contains(event.target as Node)) return;

			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
};
