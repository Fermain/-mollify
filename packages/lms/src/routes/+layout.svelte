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
	import IconNav from '$lib/components/navigation/IconNav.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import 'prismjs/themes/prism-tomorrow.css';
	import type { LayoutData } from './$types';
	import EntityNav from '$lib/components/navigation/EntityNav.svelte';

	export let data: LayoutData;
</script>

<Drawer>
	<div class="p-4">
		<EntityNav entities={data.sitemap} />
	</div>
</Drawer>

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div class="p-2">
			<EntityNav entities={data.sitemap} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<IconNav />
	</svelte:fragment>
	<Main>
		<slot />
	</Main>
	<svelte:fragment slot="footer"
		><Footer>
			<Reader />
			<Molly endpoint="/api/molly" />
		</Footer>
	</svelte:fragment>
	<Toast position="t" />
</AppShell>
