'use client';

import React, { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/trpc/client';
import { httpBatchLink } from '@trpc/client';

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient, setQueryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { refetchOnWindowFocus: false },
				},
			})
	);
	const [trpcClient, setTrpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
					fetch: (url, opts) => fetch(url, { ...opts, credentials: 'include' }),
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
