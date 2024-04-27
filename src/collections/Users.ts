import { AccessResult } from 'payload/config';
import { AccessArgs, CollectionConfig } from 'payload/types';

async function adminsAndUser({
	req: { user },
}: AccessArgs): Promise<AccessResult> {
	if (user.role === 'admin') return true;

	return {
		id: { equals: user.id },
	};
}

export const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		verify: {
			generateEmailHTML(args) {
				console.log(`user ${args.user.email} have token ${args.token}`);
				return `<p>hello pls verify</p>`;
			},
			generateEmailSubject(args) {
				return `Verification for ${args.user.email} at digitalhippo.com`;
			},
		},
	},
	access: {
		read: adminsAndUser,
		update: ({ req: { user } }) => user.role === 'admin',
		delete: ({ req: { user } }) => user.role === 'admin',
		create: () => true,
	},
	admin: {
		hidden: ({ user }) => user.role !== 'admin',
		defaultColumns: ['id'],
	},
	fields: [
		{
			name: 'products',
			label: 'Products',
			admin: {
				condition: () => false,
			},
			type: 'relationship',
			relationTo: 'products',
			hasMany: true,
		},
		{
			name: 'product_files',
			label: 'Product files',
			admin: {
				condition: () => false,
			},
			type: 'relationship',
			relationTo: 'product_files',
			hasMany: true,
		},
		{
			name: 'role',
			type: 'select',
			defaultValue: 'user',
			required: true,
			// admin: {
			// 	condition: () => false,
			// },
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'User', value: 'user' },
			],
		},
	],
};
