<script lang="ts">
  import { drawerStore } from '@skeletonlabs/skeleton';
  import type { EntityMeta } from '@mollify/types';
  export let entity: EntityMeta;
  let open = false;
  function drawerClose(): void {
    drawerStore.close();
  }
  let typeOfEntity = entity.type;

  const entityIcons = {
    Assessment: 'Task',
    Lesson: 'Article',
    Module: 'Layers',
    Course: 'Book_5',
    Programme: 'Folder',
    Institution: 'School'
  };
  let icon = entityIcons[typeOfEntity] || 'Folder';
  if (entity.children.length === 0 && !entityIcons[typeOfEntity]) {
    icon = 'Article';
  }

  function toggle() {
    open = !open;
  }
</script>

<nav class="entity">
  <div class="entity-inner">
    <div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
      <a href={entity.browserPath} on:click={drawerClose} class="entity-title flex flex-row items-center">
        <i class="icon-f p-2">{icon}</i>
        <p>{entity.title}</p>
      </a>
      {#if entity.children.length}
        <button on:click={toggle} class="btn hover:bg-primary-hover-token p-0">
          <i class="icon-f">{open ? 'expand_less' : 'expand_more'}</i>
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
