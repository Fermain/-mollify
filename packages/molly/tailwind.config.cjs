/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    require('path').join(
      require.resolve('@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}',
      './pages/**/*.{html,js,ts,svelte}',
      './components/**/*.{html,js,ts,svelte}',
      '../../packages/ui/**/*.{html,js,ts,svelte}'
    )
  ],
  theme: {
    extend: {}
  },
  plugins: [
    // 3. Append the Skeleton plugin to the end of this list
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ]
};
