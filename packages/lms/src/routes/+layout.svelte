<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../lib/styles/styles.scss';
	import { Molly } from '@mollify/molly';
	import '../app.postcss';
	import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
	import Main from '$lib/components/content/Main.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Reader from '$lib/components/header/Reader.svelte';
	import Settings from '$lib/components/header/Settings.svelte';
	import ContentNav from '$lib/components/navigation/ContentNav.svelte';
	import IconNav from '$lib/components/navigation/IconNav.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Ego from '$lib/components/ui/Ego.svelte';
</script>

<Drawer><ContentNav /></Drawer>

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<ContentNav />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<IconNav />
	</svelte:fragment>
	<div class="relative">
		<Main>
			<slot />
		</Main>
	</div>
	<svelte:fragment slot="footer"
		><Footer>
			<Ego />
			<Reader />
			<Molly endpoint="/api/molly" />
		</Footer>
	</svelte:fragment>
	<Toast position="t" />
</AppShell>
