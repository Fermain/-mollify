<script lang="ts">
  import Tag from './Tag.svelte';

  export let tags = new Array<string>();
  $: _tags = tags && Array.isArray(tags) ? tags.filter(Boolean) : [];
</script>

{#if _tags.length}
  <div class="tags gap-1 flex flex-wrap my-3">
    {#each _tags as tag}
      <Tag {tag} />
    {/each}
  </div>
{/if}

<style>
  .tags {
    grid-area: tags;
  }
</style>
