<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import * as storage from '$lib/utils/storage';
  import { page } from '$app/stores';
  import { type Bookmark, addRemoveBookmarks } from '$lib/utils/bookmarking/AddRemove';
  import { bookmarks } from '$lib/stores/bookmarks';
  import Icon from '$lib/components/ui/Icon.svelte';

  let hasBookmarks = false;
  let currentUrl = '';

  $: {
    hasBookmarks = $bookmarks.some((b) => b.url.split('/').pop() === currentUrl.split('/').pop());
  }

  $: page.subscribe((p) => {
    if (browser) {
      currentUrl = decodeURIComponent(window.location.pathname);
    }
  });

  onMount(async () => {
    if (browser) {
      const storedBookmarks = storage.load('bookmarks') ? storage.load('bookmarks') : [];
      bookmarks.set(storedBookmarks);
      currentUrl = decodeURIComponent(window.location.pathname);
    }
  });

  async function onclick() {
    const newBookmarks = await addRemoveBookmarks();
    bookmarks.set(newBookmarks || new Array<Bookmark>());
  }
</script>

<div>
  {#if hasBookmarks}
    <button
      name="tile-2"
      class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token"
      on:click={() => onclick()}
      aria-label="remove bookmark"
    >
      <Icon name="bookmark_remove" title="remove bookmark" />
    </button>
  {:else}
    <button
      name="tile-2"
      class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token"
      on:click={() => onclick()}
      aria-label="add bookmark"
    >
      <Icon name="bookmark_add" title="add bookmark" /></button
    >
  {/if}
</div>
