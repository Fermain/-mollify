<script lang="ts">
  export let title: string;
  export let browserPath: string | undefined;
  export let type: string;
  export let tags: string[];
</script>

{#if browserPath}
  <a class="card p-4 variant-ghost-surface no-underline dark:text-slate-100" href={browserPath}>
    <header class="card-header border-b flex justify-between items-baseline gap-3 p-0">
      <h3 class="h3">{title}</h3>
      <span class="chip variant-filled">{type}</span>
    </header>
    {#if tags && tags.length}
      <footer class="card-footer p-0 pt-2">
        {#each tags as tag}
          <p class="chip variant-ringed m-1 ms-0 pt-2">{tag}</p>
        {/each}
      </footer>
    {/if}
  </a>
{/if}
