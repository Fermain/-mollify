import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    fs: {
      allow: ['public/audio', '../../@sveltejs/kit/src/runtime/client'] // add your directory here
    }
  },
  build: {
    outDir: './dist', // Specify the correct output directory here
  },
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
