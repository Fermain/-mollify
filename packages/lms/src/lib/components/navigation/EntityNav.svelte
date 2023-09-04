<script lang="ts">
  import type { EntityMeta } from '@mollify/types';

  export let entities: Array<EntityMeta> | EntityMeta = [];
  $: _entities = Array.isArray(entities) ? entities : [entities];

  let open = false;

  function toggle() {
    if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
      open = !open;
    }
  }
</script>

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
      display: none; /* Hide children by default */

      &.open {
        display: block; /* Display children when open */
      }
    }
  }
</style>

{#each _entities as entity}
  <nav class="entity">
    <div class="entity-inner">
      <div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
        <a href={entity.browserPath} class="entity-title">
          {entity.title}
        </a>
        {#if entity.children.length}
          <button on:click={toggle} class="btn hover:bg-primary-hover-token p-0"
            ><i class="icon-f">{open ? 'expand_less' : 'expand_more'}</i></button
          >
        {/if}
      </div>
      {#if entity.children.length}
        <div class="entity-children" class:open={open && window.innerWidth <= 768}>
          {#each entity.children as child}
            <svelte:self entities={child} />
          {/each}
        </div>
      {/if}
    </div>
  </nav>
{/each}
