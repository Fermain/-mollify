<script lang="ts">
	import '../lib/styles/styles.scss';
	// import { Molly } from '@mollify/molly';
	import callouts from 'remark-emoji-callout';
	import Main from '$lib/components/content/Main.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Logo from '$lib/components/header/Logo.svelte';
	import Reader from '$lib/components/header/Reader.svelte';
	import Settings from '$lib/components/header/Settings.svelte';
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
	<IconNav />
	<Main>
		<slot />
	</Main>
	<ContentNav />
	<Footer>
		<Ego />
		<Reader />
		<!-- <Molly endpoint="/api/molly" /> -->
	</Footer>
</div>

<style lang="scss">
	.layout-grid {
		display: grid;
		grid-template-columns: 3rem calc(80ch + 2rem) minmax(10rem, 30rem);
		grid-template-rows: 3rem 1fr 3rem;
		height: 100vh;
		grid-template-areas:
			'brand header header header'
			'icons body contentNavs contentNavs'
			'footer footer footer footer';
		gap: 1px;
	}

	@media screen and (max-width: 870px) {
		.layout-grid {
			grid-template-columns: 3rem repeat(2, 1fr) 3rem;
			grid-template-rows: repeat(2, 3rem) 6rem 1fr 3rem;
			grid-template-areas:
				'brand header header header'
				'icons icons icons icons'
				'contentNavs contentNavs contentNavs contentNavs'
				'body body body body'
				'footer footer footer footer';
		}
	}
</style>
