<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';

	let searchQuery = '';
	let searchResults: String[] = [];
	let timer: string | number | NodeJS.Timeout | undefined;
	let inputFocused = false;
	let returnedResults = false;

	function handleSubmit(event: { preventDefault: () => void }) {
		goto(`/search?query=${encodeURIComponent(searchQuery)}`);
		searchQuery = '';
	}

	const debounceSearch = async () => {
		clearTimeout(timer);
		returnedResults = false;
		if (searchQuery.length >= 3) {
			await new Promise((resolve) => {
				timer = setTimeout(async () => {
					try {
						let results = await getSearchResults(searchQuery);
						searchResults = results.map((result: AutocompleteOption[]) => {
							const { title, slug, ...other } = result;
							return { label: title, value: slug, ...other };
						});
						console.log(searchResults);
					} catch (error) {
						console.log(error);
					}
				}, 500);
			});
		} else {
			searchResults = [];
		}
	};

	function handlePageChange() {
		searchResults = [];
		searchQuery = '';
	}

	function handleClickOutside(event: object) {
		if (!event.target.closest('.wrapper') && !event.target.closest('.search-items')) {
			handlePageChange();
		}
	}

	function handleSearchSelection(event) {
		goto(event.detail.browserPath);
	}
</script>

<svelte:window on:click={handleClickOutside} />
<div class="wrapper">
	<form class="flex sm:input-group sm:input-group-divider sm:grid-cols-[auto_1fr_auto]" on:submit|preventDefault={handleSubmit}>
		<input
			class="input hidden sm:block w-60"
			type="search"
			name="autocomplete-search"
			placeholder="Search markdown content"
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
		<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto absolute">
			<Autocomplete bind:input={searchQuery} options={searchResults} on:selection={handleSearchSelection} />
		</div>
	{/if}
	{#if searchResults.length === 0 && inputFocused && searchQuery.length >= 3 && returnedResults}
		<div class="search-items">
			<p class="no-results">No Results Found</p>
		</div>
	{/if}
</div>
