import path from 'path';
import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import search from '@payloadcms/plugin-search';

export default buildConfig({
	db: postgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URI
		}
	}),
	//@ts-ignore
	editor: lexicalEditor({}),
	admin: {
		bundler: webpackBundler()
	},
	plugins: [
		search({
			defaultPriorities: {
				pages: ({ doc }) => (doc.title.startsWith('Hello, world!') ? 1 : 10),
				posts: 20
			}
		})
	],
	collections: [
		// Your collections here
	],
	globals: [
		// Your globals here
	],
	typescript: {
		outputFile: path.resolve(__dirname, '../payload-types.ts')
	}
});
