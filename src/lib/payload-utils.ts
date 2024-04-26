import { User } from '@/payload-types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';

export const getServerSideUser = async (
	cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
	const token = cookies.get('payload-token');

	const fetchRes = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
		{
			headers: { Authorization: `JWT ${token?.value}` },
		}
	);

	const { user } = (await fetchRes.json()) as { user: User | null };

	return { user };
};
