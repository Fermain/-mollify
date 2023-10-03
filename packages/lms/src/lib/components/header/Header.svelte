<script lang="ts">
  import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
  import Logo from './Logo.svelte';
  import Search from './Search.svelte';
  import Settings from './Settings.svelte';
  import Icon from '../ui/Icon.svelte';

  function drawerOpen(): void {
    drawerStore.open();
  }
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
      <Logo />
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <Search />
    <Settings />
    <button class="lg:hidden btn btn-sm mr-4 hover:bg-primary-hover-token" on:click={drawerOpen}>
      <Icon name="menu" />
    </button>
  </svelte:fragment>
</AppBar>
