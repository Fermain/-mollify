<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../lib/styles/styles.scss';
  import { Molly } from '@mollify/molly';
  import '../app.postcss';
  import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
  import Main from '$lib/components/content/Main.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  // import Reader from '$lib/components/header/Reader.svelte';
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

  let isMobile = false;

  // Function to check if the screen width is below a certain breakpoint (e.g., 768px)
  const checkIsMobile = () => {
    isMobile = window.innerWidth < 768;
  };

  // Initial check on component mount
  checkIsMobile();

  // Listen for window resize events to update the isMobile variable
  window.addEventListener('resize', checkIsMobile);
</script>

{#if isMobile}
  <Drawer>
    <div class="p-4">
      <EntityNav entities={data.sitemap} />
    </div>
  </Drawer>
{/if}

<AppShell slotSidebarRight="bg-surface-500/5 w-0 lg:w-64">
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    {#if !isMobile}
      <div class="p-2">
        <EntityNav entities={data.sitemap} />
      </div>
    {/if}
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


<!-- <script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../lib/styles/styles.scss';
  import { Molly } from '@mollify/molly';
  import '../app.postcss';
  import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
  import Main from '$lib/components/content/Main.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  // import Reader from '$lib/components/header/Reader.svelte';
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
