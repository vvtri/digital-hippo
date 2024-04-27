import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { getPayloadClient } from '../get-payload';
import { stripe } from '../lib/stripe';
import { privateProcedure, publicProcedure, router } from './trpc';

export const paymentRouter = router({
	createSession: privateProcedure
		.input(
			z.object({
				productIds: z.array(z.string()),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const user = ctx.user;
			let { productIds } = input;

			if (productIds.length === 0) throw new TRPCError({ code: 'BAD_REQUEST' });

			const payload = await getPayloadClient();

			const { docs: products } = await payload.find({
				collection: 'products',
				where: { id: { in: productIds } },
			});

			const filteredProducts = products.filter((item) => !!item.priceId);

			const order = await payload.create({
				collection: 'orders',
				data: {
					_isPaid: false,
					products: filteredProducts.map((item) => item.id),
					user: user.id,
				},
			});

			const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

			filteredProducts.forEach((product) => {
				line_items.push({ price: product.priceId!, quantity: 1 });
			});
			line_items.push({
				price: 'price_1P9qAIB8OArU0T6Wypx7MSf3',
				quantity: 1,
				adjustable_quantity: { enabled: false },
			});

			try {
				const stripeSession = await stripe.checkout.sessions.create({
					success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
					cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
					payment_method_types: ['card'],
					mode: 'payment',
					metadata: { userId: user.id, orderId: order.id },
					line_items,
				});

				return { url: stripeSession.url };
			} catch (error) {
				console.log('error', error);

				return { url: null };
			}
		}),

	pollOrderStatus: privateProcedure
		.input(
			z.object({
				orderId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { orderId } = input;

			const payload = await getPayloadClient();

			const { docs: orders } = await payload.find({
				collection: 'orders',
				where: { id: { equals: orderId } },
			});

			if (!orders.length) throw new TRPCError({ code: 'NOT_FOUND' });

			const [order] = orders;

			return { isPaid: order._isPaid };
		}),
});
