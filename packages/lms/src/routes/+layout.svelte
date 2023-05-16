<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import callouts from 'remark-emoji-callout';
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

	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<Drawer><ContentNav /></Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span class="material-symbols-outlined"> menu </span>
					</button>
					<Logo />
				</div>
			</svelte:fragment>
			<Search />
			<svelte:fragment slot="trail"><Settings /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<ContentNav />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<Main>
		<slot />
	</Main>
	<!-- ---- / ---- -->

	<svelte:fragment slot="footer"
		><Footer>
			<Ego />
			<Reader />
		</Footer>
	</svelte:fragment>
</AppShell>

<!-- <div class="layout-grid">
	<Header>
		<Logo />
		<Search />
		<Settings />
	</Header>
	<Molly />
	<IconNav />
	<Main>
		<button class="btn variant-filled-primary">Hello world</button>
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
</style> -->
