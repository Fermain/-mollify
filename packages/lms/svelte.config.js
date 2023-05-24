import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import callouts from 'remark-emoji-callout';
import gfm from 'remark-gfm';
import { createTagLinks } from './src/lib/utils/remarkPlugins/createTagLinks.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			highlight: {},
			layout: {
				_: 'src/lib/components/mdLayout/_layout.svelte'
			},
			extensions: ['.md', '.svx'],
			remarkPlugins: [
				gfm,
				createTagLinks,
				callouts,
				{
					dataAttribute: 'custom-callout',
					titleTextTagName: 'span',
					iconTagName: 'span'
					// ...
				}
			]
		}),
		preprocess({
			postcss: true
		})
	],
	extensions: ['.svelte', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
