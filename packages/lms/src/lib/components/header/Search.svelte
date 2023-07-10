<script lang="ts">
  import { goto } from '$app/navigation';
  import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
  import type { AutocompleteOption } from '@skeletonlabs/skeleton';
  import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';
  import type { EntityMeta } from '@mollify/types';

  type EntityResult = EntityMeta & AutocompleteOption;

  let searchQuery = '';
  let searchResults = new Array<EntityResult>();
  let timer: number;
  let inputFocused = false;
  let returnedResults = false;
  let rawQuery = '';

  function handleSubmit(event: { preventDefault: () => void }) {
    goto(`/search?query=${encodeURIComponent(searchQuery)}`);
    searchQuery = '';
  }

  const debounceSearch = async () => {
    clearTimeout(timer);
    returnedResults = false;
    if (searchQuery.length) {
      await new Promise(() => {
        timer = window.setTimeout(async () => {
          try {
            const { query, filters } = parseRawSearchQuery(searchQuery);
            rawQuery = query;
            let results = await getSearchResults(query, filters);
            searchResults = results.map((result: EntityResult) => {
              const { title, slug, ...other } = result;
			  return {
				...result,
				label: title,
				value: slug,
			  }
            });
          } catch (error) {
            console.log(error);
			alert("Search error, please check console")
          }
        }, 500);
      });
    } else {
      searchResults = [];
    }
  };

  function handlePageChange() {
    setTimeout(() => {
      searchResults = [];
      searchQuery = '';
    }, 10);
  }

  function handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.wrapper') && !target.closest('.search-items')) {
      handlePageChange();
    }
  }

  $: searchResults;
</script>

<svelte:window on:click={handleClickOutside} />
<div class="max-w-sm relative">
  <form
    class="flex w-full sm:input-group sm:input-group-divider sm:grid-cols-[auto_1fr_auto]"
    on:submit|preventDefault={handleSubmit}
  >
    <input
      class="input hidden sm:block w-60"
      type="search"
      name="autocomplete-search"
      placeholder="Search markdown content"
      autocomplete="off"
      bind:value={searchQuery}
      on:input={async () => {
        debounceSearch();
      }}
      on:focus={() => {
        inputFocused = true;
      }}
      on:blur={() => {
        inputFocused = false;
      }}
    />
    <button
      class="btn hover:bg-primary-hover-token sm:variant-filled-primary sm:rounded-l-none sm:hover:bg-primary-active-token"
      ><i class="icon-f">search</i></button
    >
  </form>
  {#if searchResults.length > 0}
    <dl class="list-dl w-full max-h-48 p-4 overflow-y-auto absolute bg-surface-100-800-token">
      {#each searchResults as item, i}
        <a
          class="hover:bg-primary-hover-token rounded-container-token btn w-full text-left justify-content-start"
          href={item.browserPath}
        >
          <span class="flex-auto w-full fill-current transition-transform duration-[200ms]">
            <dt class="truncate">{item.label}</dt>
          </span>
        </a>
      {/each}
    </dl>
  {/if}
  {#if searchResults.length === 0 && inputFocused && searchQuery.length >= 3 && returnedResults}
    <div class="card w-full max-h-48 p-4 overflow-y-auto absolute">
      <p>No Results Found</p>
    </div>
  {/if}
</div>
