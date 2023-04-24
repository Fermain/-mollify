<script lang="ts">
	import Main from '$lib/components/content/Main.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Logo from '$lib/components/header/Logo.svelte';
	import Reader from '$lib/components/header/Reader.svelte';
	import Settings from '$lib/components/header/Settings.svelte';
	import Molly from '$lib/components/molly/Molly.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import '../lib/styles/styles.scss';
</script>

<div class="layout-grid">
	<Logo />
	<Reader />
	<Settings />
	<Molly />
	<Main>
		<slot />
	</Main>
	<Footer />
	<Navigation type={'course'} />
	<Navigation type={'module'} />
</div>

<style lang="scss">
	.layout-grid {
		display: grid;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		grid-template-columns: 2rem 1fr 3.75rem;
		grid-template-rows: 2rem auto 1fr auto;
		grid-template-areas:
			'brand reader settings'
			'brand tbc tbc'
			'nav1 main nav2'
			'footer footer footer';
	}
</style>
