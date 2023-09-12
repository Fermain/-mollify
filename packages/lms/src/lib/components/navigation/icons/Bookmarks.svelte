<script lang="ts">
  import { Modal } from '@skeletonlabs/skeleton';
  import type { ModalSettings } from '@skeletonlabs/skeleton';
  import { modalStore } from '@skeletonlabs/skeleton';
  import BookmarkList from './BookmarkList.svelte';

  const modalComponent = {
    Logo: {
      ref: BookmarkList
    }
  };

  const searchModal: ModalSettings = {
    type: 'component',
    component: 'Logo'
  };
</script>

<div>
  <button
    name="tile-2"
    class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token"
    on:click={() => modalStore.trigger(searchModal)}
  >
    <div class="app-rail-tile-icon"><i class="icon-f">bookmark</i></div>
  </button>

  <Modal components={modalComponent} />
</div>
