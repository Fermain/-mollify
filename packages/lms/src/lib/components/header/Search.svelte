<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import SearchItem from '../search/SearchItem.svelte';
	import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';

	let searchQuery = '';
	let searchResults: String[] = [];
	let timer: string | number | NodeJS.Timeout | undefined;
	let inputFocused = false;
	let returnedResults = false;

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		console.log(event);
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
						const { query, filters } = await parseRawSearchQuery(searchQuery);
						searchResults = await getSearchResults(query, filters);
						returnedResults = true;
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
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.wrapper') && !event.target.closest('.search-items')) {
			handlePageChange();
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />
<div class="wrapper">
	<form class="search" on:submit={handleSubmit}>
		<input
			type="search"
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
		<button>Search</button>
	</form>
	{#if searchResults.length > 0 && inputFocused}
		<div class="search-items">
			{#each searchResults as item, i}
				<SearchItem data={item} on:pageChange={handlePageChange} />
			{/each}
		</div>
	{/if}
	{#if searchResults.length === 0 && inputFocused && searchQuery.length >= 3 && returnedResults}
		<div class="search-items">
			<p class="no-results">No Results Found</p>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		width: 100%;
	}

	.search-items {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-s);
		top: 100%;
		border: 1px solid var(--primary);
		border-top: 0;
		width: 100%;
		left: 0;
		z-index: 4;
		background-color: var(--background-secondary);
		color: var(--text-primary);
		border-radius: var(--border-radius-s);
		padding: var(--spacing-s);
		transition: max-height 0.1s ease-in-out;
		overflow-x: hidden;
	}

	.no-results {
		padding: var(--spacing-s) var(--spacing-xxs);
		background-color: var(--background-primary);
		border-radius: var(--spacing-xxs);
	}
</style>
