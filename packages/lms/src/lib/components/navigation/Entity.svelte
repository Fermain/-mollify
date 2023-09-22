<script lang="ts">
  import { page } from '$app/stores';
  import { drawerStore } from '@skeletonlabs/skeleton';
  import type { EntityMeta } from '@mollify/types';
  import Icon from '../ui/Icon.svelte';
  import { onMount } from 'svelte';
  export let entity: EntityMeta;
  let open = false;

  function drawerClose(): void {
    drawerStore.close();
  }
  let typeOfEntity = entity.type;

  const entityIcons = {
    Assessment: 'task',
    Lesson: 'article',
    Module: 'layers',
    Course: 'book',
    Programme: 'folder',
    Institution: 'school'
  };
  let icon = entityIcons[typeOfEntity] || 'folder';
  if (entity.children.length === 0 && !entityIcons[typeOfEntity]) {
    icon = 'article';
  }

  onMount(() => {
    if (decodeURI($page.url.pathname).includes(entity.browserPath as string)) toggle();
  });

  function toggle() {
    open = !open;
  }
</script>

<nav class="entity">
  <div class="entity-inner">
    <div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
      {#if entity.browserPath}
        <a
          href={entity.browserPath}
          on:click={drawerClose}
          class="entity-title flex flex-row items-center"
          class:active={decodeURI($page.url.pathname) + '/' === entity.browserPath}
        >
          <Icon name={icon} />
          <p class="ms-2">{entity.title}</p>
        </a>
      {:else}
        <button on:click={toggle} class="entity-title flex flex-row items-center">
          <Icon name={icon} />
          <span class="ms-2 text-start">{entity.title}</span>
        </button>
      {/if}

      {#if entity.children.length}
        <button on:click={toggle} class="btn hover:bg-primary-hover-token p-0">
          <Icon name={open ? 'expand_less' : 'expand_more'} />
        </button>
      {/if}
    </div>
    {#if entity.children.length}
      <div class="entity-children" class:open>
        {#each entity.children as child}
          <svelte:self entity={child} />
        {/each}
      </div>
    {/if}
  </div>
</nav>

<style lang="scss">
  .entity {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:has(.active) {
        background-color: rgb(188, 188, 229);
      }
    }

    &-title {
      flex: 1;
      padding: 0.5rem 0;
      padding-left: 0.5rem;
    }

    &-children {
      padding-left: 0.5rem;

      &:not(.open) {
        display: none;
      }
    }
  }
</style>
