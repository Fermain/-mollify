import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import callouts from 'remark-emoji-callout';
import gfm from 'remark-gfm';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import codeBlockPlugin from './src/lib/utils/remarkPlugins/codeBlockPlugin.js';
import embedVideoPlugin from './src/lib/utils/remarkPlugins/embedVideoPlugin.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      layout: path.join(__dirname, './src/lib/components/ui/Layout.svelte'),
      extensions: ['.md', '.svx'],
      remarkPlugins: [
        gfm,
        callouts,
        {
          dataAttribute: 'custom-callout',
          titleTextTagName: 'span',
          iconTagName: 'span'
          // ...
        },
        codeBlockPlugin, 
        embedVideoPlugin
      ]
    }),
    preprocess({
      postcss: true
    })
  ],
  extensions: ['.svelte', '.md'],
  kit: {
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: node({
      out: '../../../build'
    })
  }
};

export default config;
