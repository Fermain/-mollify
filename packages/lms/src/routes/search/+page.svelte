<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { files } from '$lib/stores/files';
  import { getSearchResults, type FiltersType } from '$lib/utils/fuseSearch/getSearchResults';
  import type { EntityMeta } from '@mollify/types';
  import { slide } from 'svelte/transition';
  import { generateRawSearchQuery } from '$lib/utils/fuseSearch/generateRawSearchQuery';
  import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';
  import { updateQueryString } from '$lib/utils/fuseSearch/updateQueryString';
  import Card from '$lib/components/cards/Card.svelte';

  type QueryType = {
    query: string;
    filters: FiltersType;
  };

  let searchQuery = '';
  let rawSearchQuery = '';
  let searchQueryExact = false;
  let searchTypes: string[] = [];
  let searchTagsString = '';
  let searchTags: string[] = [];
  let searchExclusions = '';
  let searchResults: EntityMeta[] = [];
  let selectedInstitution = 'all';
  let query = '';
  let isMatch = false;
  let processedQuery: QueryType = {
    query: '',
    filters: {
      exact: false,
      types: [],
      tags: [],
      institution: '',
      exclusions: []
    }
  };

  const queryParam = $page.url.searchParams.get('query');
  if (typeof queryParam === 'string') {
    query = decodeURIComponent(queryParam);
  }

  let filter: FiltersType = {
    exact: searchQueryExact,
    types: searchTypes,
    institution: selectedInstitution,
    exclusions: searchExclusions.trim() !== '' ? searchExclusions.split(' ') : [],
    tags: searchTags
  };

  async function updateSearchResults() {
    filter = {
      exact: searchQueryExact,
      types: searchTypes,
      tags: searchTags,
      institution: selectedInstitution,
      exclusions: searchExclusions.trim() !== '' ? searchExclusions.split(' ') : []
    };
    searchResults = await getSearchResults(searchQuery, filter);
  }

  onMount(async () => {
    // Parse query string if present, update values and get search results
    if (query.trim() !== '') {
      rawSearchQuery = query;
      processedQuery = parseRawSearchQuery(rawSearchQuery);
      searchQuery = processedQuery.query;
      searchQueryExact = processedQuery.filters.exact;
      searchTypes = processedQuery.filters.types;
      searchTags = processedQuery.filters.tags;
      searchTagsString = searchTags.join(', ');
      console.log($files);

      if ($files !== null) {
        // check if institution exists
        isMatch = $files.some(
          (file: EntityMeta) => file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
        );
        // if it does, update the value to the correct character case
        if (isMatch) {
          const fileMatch = $files.find(
            (file: EntityMeta) => file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
          );
          if (fileMatch) {
            processedQuery.filters.institution = fileMatch.title;
          }
        }
      }
      selectedInstitution = isMatch ? processedQuery.filters.institution : 'all';
      searchExclusions = processedQuery.filters.exclusions.join(', ');
      await updateSearchResults();
    }
  });

  // update search results on submit
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    updateSearchResults();
    searchTagsString.trim() === '' ? (searchTags = []) : (searchTags = searchTagsString.split(', '));

    const rawSearchQuery = generateRawSearchQuery(
      searchQuery,
      searchExclusions,
      searchTypes,
      searchTags,
      selectedInstitution,
      searchQueryExact
    );
    updateQueryString({
      query: rawSearchQuery
    });
    toggleOpen();
  }

  // open/close advanced search options
  let open = true;
  function toggleOpen(): void {
    open = !open;
  }

  $: searchTagsString.trim() === '' ? (searchTags = []) : (searchTags = searchTagsString.split(', '));
</script>

<section class="p-4">
  <h1 class="h1 mb-8">Search</h1>
  <div class="search-wrapper">
    <form class="search" on:submit={handleSubmit}>
      <label class="label flex flex-col" for="search">
        <span class="font-medium">Search query</span>
        <input
          class="input sm:w-3/4"
          type="search"
          id="search"
          placeholder="Search markdown content"
          bind:value={searchQuery}
        />
      </label>
      {#if open}
        <div class="search-options" transition:slide={{ duration: 300 }}>
          <label class="flex items-center space-x-2 mt-1 mb-6" for="search-exact">
            <input class="checkbox" type="checkbox" value={true} id="search-exact" bind:checked={searchQueryExact} />
            <span>Exact Match</span>
          </label>

          <label class="label flex flex-col mt-1 mb-6" for="search-exclusions">
            <span class="font-medium">Excluded Terms</span>
            <input
              class="input sm:w-3/4"
              type="text"
              id="search-exclusions"
              placeholder="Exclude terms, eg: term1, term2"
              bind:value={searchExclusions}
            />
          </label>

          <label class="label flex flex-col mt-1 mb-6" for="search-tags">
            <span class="font-medium">Included Tags</span>
            <input
              class="input sm:w-3/4"
              type="text"
              id="search-tags"
              placeholder="Include these tags, eg: tag1, tag2"
              bind:value={searchTagsString}
            />
          </label>

          {#if $files && $files?.length > 1}
            <label class="label font-medium" for="institution-options">Institution</label>
            <select class="select mt-1 rounded-md sm:w-3/4" bind:value={selectedInstitution} id="institution-options">
              <option value="all">All</option>
              {#each $files as file}
                <option value={file.foldername}>{file.title}</option>
              {/each}
            </select>
          {/if}
          <div>
            <div class="my-6">
              <span class="label font-medium">Search type</span>
              <div class="flex gap-4 flex-wrap">
                <label class="flex items-center space-x-2 mt-1" for="programme">
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="type"
                    value="programme"
                    id="programme"
                    bind:group={searchTypes}
                  />
                  <p>Programmes</p>
                </label>

                <label class="flex items-center space-x-2 mt-1" for="course">
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="type"
                    value="course"
                    id="course"
                    bind:group={searchTypes}
                  />
                  <p>Courses</p>
                </label>

                <label class="flex items-center space-x-2 mt-1" for="module">
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="type"
                    value="module"
                    id="module"
                    bind:group={searchTypes}
                  />
                  <p>Modules</p>
                </label>

                <label class="flex items-center space-x-2 mt-1" for="lesson">
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="type"
                    value="lesson"
                    id="lesson"
                    bind:group={searchTypes}
                  />
                  <p>Lessons</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      {/if}
      <div class="flex flex-wrap my-8 gap-4">
        <button type="submit" class="btn variant-filled-primary" on:submit={handleSubmit}>Search</button>
        <div>
          <button class="btn variant-outline-primary variant-filled-secondary" type="button" on:click={toggleOpen}
            >Advanced Search Options</button
          >
        </div>
      </div>
    </form>
  </div>
  <div>
    {#if searchQuery.trim() !== ''}
      <div class="chip variant-filled">
        <div class="key">{searchQueryExact ? 'Exact:' : 'Fuzzy:'}</div>
        <div>{searchQuery}</div>
      </div>
    {/if}
    {#if searchExclusions.length !== 0}
      <div class="chip variant-filled">
        <div class="key">Excludes:</div>
        <div>{searchExclusions}</div>
      </div>
    {/if}
    {#if searchTags.length !== 0}
      <div class="chip variant-filled">
        <div class="key">Tags:</div>
        <div>{searchTags.join(', ')}</div>
      </div>
    {/if}
    {#if searchTypes.length > 0}
      <div class="chip variant-filled">
        <div class="key">Types:</div>
        <div>{searchTypes.join(', ')}</div>
      </div>
    {/if}
    {#if selectedInstitution !== 'all'}
      <div class="chip variant-filled">
        <div class="key">Institution:</div>
        <div>{selectedInstitution}</div>
      </div>
    {/if}
  </div>
  {#if searchResults.length > 0}
    <h2 class="h2 mt-10 mb-8">Search Results</h2>
  {:else}
    <h2 class="h2 mt-10 mb-8">No Results</h2>
  {/if}

  <div class="results-container">
    {#if searchResults && searchResults.length}
      <div class="grid sm:grid-cols-2 gap-4">
        {#each searchResults as { title, type, browserPath, tags }}
          <Card {title} {type} {browserPath} {tags} />
        {/each}
      </div>
    {/if}
  </div>
</section>
