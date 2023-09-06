<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../lib/styles/styles.scss';
  import { Molly } from '@mollify/molly';
  import '../app.postcss';
  import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
  import Main from '$lib/components/content/Main.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import IconNav from '$lib/components/navigation/IconNav.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import 'prismjs/themes/prism-tomorrow.css';
  import type { LayoutData } from './$types';
  import EntityNav from '$lib/components/navigation/EntityNav.svelte';
  import { page } from '$app/stores';

  export let data: LayoutData;

  const scrollIntoView = (node: HTMLElement) => {
    node.scrollIntoView();
  };

  let isMobile = window.innerWidth <= 768; // Check for mobile viewport width
  let isNavVisible = false; // Initialize the visibility state

  const handleNavItemClick = () => {
    if (isMobile) {
      isNavVisible = !isNavVisible; // Toggle the visibility of the navigation bar
    }
  };

  // Add a listener to resize events to toggle the navigation based on viewport width
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      isNavVisible = false; // Close the navigation on wider screens
    }
  });
</script>

<Drawer open={isNavVisible}>
  <div class="p-4">
    <EntityNav entities={data.sitemap} on:click={handleNavItemClick} />
  </div>
</Drawer>

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <div class="p-2">
      <EntityNav entities={data.sitemap} on:click={handleNavItemClick} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <IconNav />
  </svelte:fragment>
  {#key $page.url.pathname}
    <div use:scrollIntoView />
  {/key}
  <Main>
    <slot />
  </Main>
  <svelte:fragment slot="footer"
    ><Footer>
      <!-- <Reader /> -->
      <div class="flex-1"></div>
      <Molly endpoint="/api/molly" />
    </Footer>
  </svelte:fragment>
  <Toast position="t" />
</AppShell>
<!-- <script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../lib/styles/styles.scss';
  import { Molly } from '@mollify/molly';
  import '../app.postcss';
  import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
  import Main from '$lib/components/content/Main.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import IconNav from '$lib/components/navigation/IconNav.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import 'prismjs/themes/prism-tomorrow.css';
  import type { LayoutData } from './$types';
  import EntityNav from '$lib/components/navigation/EntityNav.svelte';
  import { page } from '$app/stores';

  export let data: LayoutData;

  const scrollIntoView = (node: HTMLElement) => {
    node.scrollIntoView();
  };

  let isMobile = false; // Set this based on screen width or viewport size
  let isNavVisible = false; // Initialize the visibility state

  const handleNavItemClick = () => {
    if (isMobile) {
      isNavVisible = !isNavVisible; // Toggle the visibility of the navigation bar
    }
  };
</script>

<Drawer>
  <div class="p-4">
    <EntityNav entities={data.sitemap} on:click={handleNavItemClick} />
  </div>
</Drawer>

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <div class="p-2">
      <EntityNav entities={data.sitemap} on:click={handleNavItemClick} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <IconNav />
  </svelte:fragment>
  {#key $page.url.pathname}
    <div use:scrollIntoView />
  {/key}
  <Main>
    <slot />
  </Main>
  <svelte:fragment slot="footer"
    ><Footer>
      
      <div class="flex-1"></div>
      <Molly endpoint="/api/molly" />
    </Footer>
  </svelte:fragment>
  <Toast position="t" />
</AppShell> -->