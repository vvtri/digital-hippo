import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import {
	CreateExpressContextOptions,
	createExpressMiddleware,
} from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 5000;

const createContext = ({ req, res }: CreateExpressContextOptions) => ({
	req,
	res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {
	const payload = await getPayloadClient({
		initOptions: {
			express: app,
			onInit: async (cms) => {
				cms.logger.info(`ADMIN URL ${cms.getAdminURL()}`);
			},
		},
	});

	app.use(
		'/api/trpc',
		createExpressMiddleware({
			router: appRouter,
			createContext,
		})
	);

	app.use((req, res) => nextHandler(req, res));

	nextApp.prepare().then(() => {
		payload.logger.info(`Next.js started`);

		app.listen(port, async () => {
			payload.logger.info(`Nextjs App URL: ${process.env.NEXT_SERVER_URL}`);
		});
	});
};

start();
