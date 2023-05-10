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
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let path = '';
	function updatePath() {
		path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
	}

	onMount(async () => {
		updatePath();
	});

	page.subscribe(async (data) => {
		updatePath();
		const response = await fetch('/api/getCurrentPage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: path })
		});
		const matter = await response.json();
		console.log(matter);
	});
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
		grid-template-columns: 3rem calc(80ch + 2rem) 1fr 1fr;
		grid-template-rows: 3rem 1fr 3rem;
		height: 100vh;
		grid-template-areas:
			'brand header header header'
			'icons body nav1 nav2'
			'footer footer footer footer';
		gap: 0.5rem;
	}
</style>
