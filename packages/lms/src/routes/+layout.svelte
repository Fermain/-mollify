<script lang="ts">
	import '../lib/styles/styles.scss';
	import Main from '$lib/components/content/Main.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Logo from '$lib/components/header/Logo.svelte';
	import Reader from '$lib/components/header/Reader.svelte';
	import Settings from '$lib/components/header/Settings.svelte';
	import Molly from '$lib/components/molly/Molly.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import ContentNav from '$lib/components/navigation/ContentNav.svelte';
	import IconNav from '$lib/components/navigation/IconNav.svelte';
	import Header from '$lib/components/header/Header.svelte';
</script>

<div class="layout-grid">
	<Logo />
	<Header>
		<Reader />
		<Settings />
	</Header>
	<Molly />
	<IconNav />
	<Main>
		<slot />
	</Main>
	<Navigation />
	<ContentNav />
	<Footer />
</div>

<style lang="scss">
	.layout-grid {
		display: grid;
		grid-template-columns: 3rem calc(80ch + 2rem) 1fr 1fr;
		grid-template-rows: 3rem 1fr 3rem;
		height: 100vh;
		grid-template-areas:
			'brand header header header'
			'icons body nav1 nav2'
			'footer footer footer footer';
		gap: 0.5rem;
		padding-right: 1rem;
	}
</style>
