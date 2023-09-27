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
    <div class="flex items-center">
      <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
        <Icon name="menu" />
      </button>
      <Logo />
    </div>
  </svelte:fragment>
  <Search />
  <svelte:fragment slot="trail"><Settings /></svelte:fragment>
</AppBar>
