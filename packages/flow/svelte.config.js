import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import callouts from 'remark-emoji-callout';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			highlight: {},
			extensions: ['.md'],
			remarkPlugins: [
				callouts,
				{
					dataAttribute: 'custom-callout',
					titleTextTagName: 'span',
					iconTagName: 'span'
					// ...
				}
			],
			layout: {
				content: path.resolve('src/routes/content/content.svelte')
			}
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	extensions: ['.svelte', '.md']
};

export default config;
