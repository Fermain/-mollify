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

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
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
	<svelte:fragment slot="sidebarRight">
		<ContentNav />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<IconNav />
	</svelte:fragment>
	<Main>
		<slot />
	</Main>
	<svelte:fragment slot="footer"
		><Footer>
			<Ego />
			<Reader />
		</Footer>
	</svelte:fragment>
</AppShell>
