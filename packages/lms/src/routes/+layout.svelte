<script lang="ts">
	import '../lib/styles/styles.scss';
	import Main from '$lib/components/content/Main.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Logo from '$lib/components/header/Logo.svelte';
	import Reader from '$lib/components/header/Reader.svelte';
	import Settings from '$lib/components/header/Settings.svelte';
	import Molly from '$lib/components/molly/Molly.svelte';
	import ContentNav from '$lib/components/navigation/ContentNav.svelte';
	import IconNav from '$lib/components/navigation/IconNav.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ego from '$lib/components/ui/Ego.svelte';
	import Search from '$lib/components/header/Search.svelte';
</script>

<div class="layout-grid">
	<Logo />
	<Header>
		<Search />
		<Settings />
	</Header>
	<Molly />
	<IconNav />
	<Main>
		<slot />
	</Main>
	<ContentNav />
	<Footer>
		<Ego />
		<Reader />
	</Footer>
</div>

<style lang="scss">
	.layout-grid {
		display: grid;
		grid-template-columns: 3rem 1fr repeat(2, 15rem);
		grid-template-rows: 3rem 1fr 3rem;
		height: 100vh;
		grid-template-areas:
			'brand header header header'
			'icons body nav1 nav2'
			'footer footer footer footer';
		gap: 0.5rem;
	}

	@media screen and (max-width: 935px) {
		.layout-grid {
			grid-template-columns: 3rem repeat(2, 1fr) 3rem;
			grid-template-rows: repeat(3, 3rem) 1fr 3rem;
			grid-template-areas:
				'brand header header header'
				'icons icons icons icons'
				'nav1 nav1 nav2 nav2'
				'body body body body'
				'footer footer footer footer';
			gap: 0.2rem;
		}
	}
</style>
