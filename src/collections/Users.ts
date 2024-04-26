import { CollectionConfig } from 'payload/types';

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
		read: () => true,
		create: () => true,
	},
	fields: [
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
