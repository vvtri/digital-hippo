import { Access } from 'payload/config';
import { CollectionConfig } from 'payload/types';

const isAdminOrHasAccessToTheImages: Access = async ({ req, data }) => {
	const user = req.user;
	if (!user) return false;

	if (user.role === 'admin') return true;
	return {
		user: {
			equals: req.user.id,
		},
	};
};

export const Media: CollectionConfig = {
	slug: 'media',
	hooks: {
		beforeChange: [
			({ data, req }) => {
				return { ...data, user: req.user.id };
			},
		],
	},
	access: {
		read: async ({ req, data }) => {
			const referer = req.headers.referer;

			if (!req.user || !referer?.includes('sell')) return true;

			return await isAdminOrHasAccessToTheImages({ req, data });
		},
		delete: isAdminOrHasAccessToTheImages,
		update: isAdminOrHasAccessToTheImages,
	},
	admin: { hidden: ({ user }) => user.role !== 'admin' },
	upload: {
		staticURL: '/media',
		staticDir: 'media',
		imageSizes: [
			{ name: 'thumbnail', width: 400, height: 300, position: 'centre' },
			{ name: 'card', width: 768, height: 1024, position: 'centre' },
			{ name: 'tablet', width: 1024, position: 'centre' },
		],
		mimeTypes: ['image/*'],
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
};
