<script>
	import ContentNav from '$lib/components/ContentNav.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
</script>

<div class="page-wrapper">
	<ContentNav />
	<main>
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</main>
	<SiteNav />
</div>

<style lang="scss">
	.page-wrapper {
		display: grid;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		grid-template-columns: 2rem 1fr 3.75rem;
		grid-template-rows: 2rem auto 1fr auto;
		grid-template-areas:
			'brand reader settings'
			'brand tbc tbc'
			'. main main'
			'footer footer footer';
	}
	main {
		max-width: 80ch;
		margin: 0 auto;
		min-height: 100dvh;
	}
</style>
