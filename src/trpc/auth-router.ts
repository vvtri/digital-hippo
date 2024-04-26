import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const authRouter = router({
	createPayloadUser: publicProcedure
		.input(AuthCredentialsValidator)
		.mutation(async ({ input }) => {
			const { email, password } = input;
			const payload = await getPayloadClient();

			const { docs: users } = await payload.find({
				collection: 'users',
				where: {
					email: {
						equals: email,
					},
				},
				limit: 1,
			});

			if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' });

			const user = await payload.create({
				collection: 'users',
				data: { email, password, role: 'user' },
			});

			return { success: true, sentToEmail: email };
		}),

	verifyEmail: publicProcedure
		.input(z.object({ token: z.string().min(1) }))
		.query(async ({ input }) => {
			const token = input.token;
			const payload = await getPayloadClient();

			const isVerified = await payload.verifyEmail({
				collection: 'users',
				token,
			});

			if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' });

			return { success: true, isVerified };
		}),

	signIn: publicProcedure
		.input(AuthCredentialsValidator)
		.mutation(async ({ ctx, input }) => {
			const { email, password } = input;
			const { req, res } = ctx;

			const payload = await getPayloadClient();

			try {
				await payload.login({
					collection: 'users',
					data: { email, password },
					res,
				});

				return { success: true };
			} catch (error) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
		}),
});
