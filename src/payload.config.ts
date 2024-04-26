import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import dotenv from 'dotenv';
import path from 'path';
import { buildConfig } from 'payload/config';
import { Users } from './collections/Users';
import { Products } from './collections/products/Products';
import { Media } from './collections/Media';
import { ProductFiles } from './collections/ProductFiles';
import { Orders } from './collections/Orders';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
	collections: [Users, Products, Media, ProductFiles, Orders],
	routes: {
		admin: '/sell',
	},
	editor: slateEditor({}),
	admin: {
		user: 'users',
		bundler: webpackBundler(),
		meta: {
			titleSuffix: ' - DigitalHippo',
			favicon: '/favicon.ico',
			ogImage: '/thumbnail.jpg',
		},
	},
	db: mongooseAdapter({ url: process.env.MONGODB_URL! }),
	rateLimit: { max: 2000 },
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
});
