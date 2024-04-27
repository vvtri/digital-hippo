import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn, constructMetadata } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='h-full'>
			<body
				className={cn('relative h-full font-sans antialiased', inter.className)}
			>
				<main className='relative min-h-screen flex flex-col'>
					<Providers>
						<Navbar />
						<div className='flex-grow flex-1'>{children}</div>
						<div className='h-52 w-10'></div>

						<Footer />
					</Providers>
				</main>

				<Toaster position='top-right' richColors theme='system' closeButton />
			</body>
		</html>
	);
}
