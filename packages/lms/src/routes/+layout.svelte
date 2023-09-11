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

  let isMobile = false; // Initialize the visibility state

  // Check if the code is running in a browser environment
  if (typeof Svelte !== 'undefined' && Svelte.window) {
    isMobile = Svelte.window.innerWidth <= 768;

    // Add a listener to resize events to toggle the navigation based on viewport width
    const handleWindowResize = () => {
      isMobile = Svelte.window.innerWidth <= 768;
    };

    Svelte.window.addEventListener('resize', handleWindowResize);
  }

  // Declare the handleNavItemClick function
  const handleNavItemClick = () => {
    if (isMobile) {
      isNavVisible = !isNavVisible; // Toggle the visibility of the navigation bar
    }
  };

  let isNavVisible = false; // Initialize the visibility state
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
  <svelte:fragment slot="footer">
    <Footer>
      <!-- <Reader /> -->
      <div class="flex-1"></div>
      <Molly endpoint="/api/molly" />
    </Footer>
  </svelte:fragment>
  <Toast position="t" />
</AppShell>
