import payload, { Payload } from 'payload';
import { InitOptions } from 'payload/config';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const transporter = nodemailer.createTransport({
	host: 'smtp.resend.com',
	secure: true,
	port: 465,
	auth: { user: 'resend', pass: process.env.RESEND_API_KEY },
});

let cached = (global as any).cached;

if (!cached) {
	cached = (global as any).cached = {
		client: null,
		promise: null,
	};
}

type Args = {
	initOptions?: Partial<InitOptions>;
};

export const getPayloadClient = async ({
	initOptions,
}: Args = {}): Promise<Payload> => {
	const secret = process.env.PAYLOAD_SECRET;
	if (!secret) throw new Error(`PAYLOAD_SECRET is missing`);

	if (cached.client) return cached.client;

	if (!cached.promise) {
		cached.promise = payload.init({
			email: {
				transport: transporter,
				fromAddress: 'onboarding@resend.dev',
				fromName: 'digital',
			},
			secret,
			local: !initOptions?.express,
			...initOptions, 
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}

	return cached.client;
};
