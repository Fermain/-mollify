<script lang="ts">
  import type { EntityMeta } from '@mollify/types';
  import { readable, writable } from 'svelte/store';
  import { onMount } from 'svelte';

  export let entities: Array<EntityMeta> | EntityMeta = [];
  let _entities = Array.isArray(entities) ? entities : [entities]; // Define _entities based on entities prop

  // Use Svelte writable store for the "open" state
  let openStates = writable({});
  let isMobile = false; // Initialize the mobile state

  onMount(() => {
    // Add a listener to resize events to track the mobile state
    const handleWindowResize = () => {
      isMobile = window.innerWidth <= 768;
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function toggle(entityId: string) {
    openStates.update((states) => {
      states[entityId] = !states[entityId];
      return { ...states };
    });

    // Close the navigation on mobile
    if (isMobile) {
      closeNav(entityId);
    }
  }

  // Function to close the navigation with a sliding animation on mobile
  function closeNav(entityId: string) {
    const navElement = document.querySelector('.entity');
    if (navElement) {
      navElement.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        openStates.update((states) => {
          states[entityId] = false;
          return { ...states };
        });
        navElement.style.transform = ''; // Reset the transform
      }, 300); // Adjust the animation duration as needed
    }
  }
</script>

{#each _entities as entity}
  <nav class="entity" tabindex="0">
    <div class="entity-inner">
      <div
        class="entity-header hover:bg-primary-hover-token rounded-container-token p-2"
        on:click={() => toggle(entity.id)}
      >
        <a href={entity.browserPath} class="entity-title">
          {entity.title}
        </a>
        {#if entity.children.length}
          <button class="btn hover:bg-primary-hover-token p-0">
            <i class="icon-f">{openStates[entity.id] ? 'expand_less' : 'expand_more'}</i>
          </button>
        {/if}
      </div>
      {#if entity.children.length}
        <div class="entity-children" class:open={$openStates[entity.id]}>
          {#each entity.children as child}
            <svelte:self entities={child} />
          {/each}
        </div>
      {/if}
    </div>
  </nav>
{/each}

<style lang="scss">
  .entity {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s ease;
      cursor: pointer; /* Add cursor pointer to indicate clickable element */
    }

    &-title {
      flex: 1;
      padding: 0.5rem 0;
      padding-left: 0.5rem;
      display: flex;
      align-items: center; /* Center icon and text vertically */
    }

    &-icon {
      margin-right: 0.5rem; /* Add space between icon and text */
    }

    &-children {
      padding-left: 0.5rem;

      &:not(.open) {
        display: none;
      }
    }
  }
</style>


{#each _entities as entity}
  <nav class="entity" tabindex="0">
    <div class="entity-inner">
      <div
        class="entity-header hover:bg-primary-hover-token rounded-container-token p-2"
        on:click={() => toggle(entity.id)}
      > 
        <a href={entity.browserPath} class="entity-title">
          {#if entity.type === 'institution'}
            <i class="icon-institution entity-icon"></i>
          {:else if entity.type === 'programme'}
            <i class="icon-programme entity-icon"></i>
          {:else if entity.type === 'course'}
            <i class="icon-course entity-icon"></i>
          {:else if entity.type === 'module'}
            <i class="icon-module entity-icon"></i>
          {:else if entity.type === 'lesson'}
            <i class="icon-lesson entity-icon"></i>
          {/if}
          {entity.title}
        </a>
        
        {#if entity.children.length}
          <button class="btn hover:bg-primary-hover-token p-0">
            <i class="icon-f">{openStates[entity.id] ? 'expand_less' : 'expand_more'}</i>
          </button>
        {/if}
      </div>
      {#if entity.children.length}
        <div class="entity-children" class:open={$openStates[entity.id]}>
          {#each entity.children as child}
            <svelte:self entities={child} />
          {/each}
        </div>
      {/if}
    </div>
  </nav>
{/each}

