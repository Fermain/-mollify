/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),

		'../**/*.{html,js,svelte,ts}',
		'./pages/**/*.{html,js,ts,svelte}',
		'./components/**/*.{html,js,ts,svelte}',
		'../../packages/ui/**/*.{html,js,ts,svelte}'
	],

	theme: {
		extend: {}
	},

	plugins: [
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	]
};

module.exports = config;
