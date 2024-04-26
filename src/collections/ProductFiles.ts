import { Product } from '../payload-types';
import { Access } from 'payload/config';
import { CollectionConfig } from 'payload/types';

const yourOwnAndPurchased: Access = async ({ req, data }) => {
	const user = req.user;
	if (!user) return false;

	if (user.role === 'admin') return true;

	const { docs: products } = await req.payload.find({
		collection: 'products',
		depth: 0,
		where: {
			user: {
				equals: user.id,
			},
		},
	});

	const ownProductFileIds = products.map((prod) => prod.product_files).flat();

	const { docs: orders } = await req.payload.find({
		collection: 'orders',
		depth: 2,
		where: {
			user: {
				equals: user.id,
			},
		},
	});

	const purchasedProductFileIds = orders
		.map((order) =>
			(order.products as (string | Product)[])
				.map((product) => {
					if (typeof product === 'string')
						return req.payload.logger.error(
							`Search depth not sufficient to find purchased file IDs`
						);

					return typeof product.product_files === 'string'
						? product.product_files
						: product.product_files.id;
				})
				.filter(Boolean)
		)
		.flat();

	return {
		id: {
			in: [...ownProductFileIds, ...purchasedProductFileIds],
		},
	};
};

export const ProductFiles: CollectionConfig = {
	slug: 'product_files',
	admin: { hidden: ({ user }) => user.role !== 'admin' },
	hooks: {
		beforeChange: [
			({ data, req }) => {
				return { ...data, user: req.user.id };
			},
		],
	},
	upload: {
		staticURL: '/product_files',
		staticDir: 'product_files',
		imageSizes: [
			{ name: 'thumbnail', width: 400, height: 300, position: 'centre' },
			{ name: 'card', width: 768, height: 1024, position: 'centre' },
			{ name: 'tablet', width: 1024, position: 'centre' },
		],
		mimeTypes: ['image/*', 'font/*', 'application/postscript'],
	},

	fields: [
		{
			name: 'user',
			type: 'relationship',
			relationTo: 'users',
			required: true,
			hasMany: false,
			admin: { condition: () => false },
		},
	],

	access: {
		read: yourOwnAndPurchased,
		update: ({ req }) => req.user.role === 'admin',
		delete: ({ req }) => req.user.role === 'admin',
	},
};
