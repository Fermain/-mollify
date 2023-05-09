<script lang="ts">
	import { goto } from '$app/navigation';
	//import { search } from '$lib/utils/graphql/getSearchResults';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';

	import SearchItem from '../search/SearchItem.svelte';

	let searchQuery = '';
	let searchResults: String[] = [];
	let timer;

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		console.log(event);
		goto(`/search?query=${searchQuery}`);
	}

	const debounceSearch = async () => {
		clearTimeout(timer);
		if (searchQuery.length >= 3) {
			await new Promise((resolve) => {
				timer = setTimeout(async () => {
					try {
						searchResults = await getSearchResults(searchQuery);
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
		/>
		<button>Search</button>
	</form>
	{#if searchResults.length > 0}
		<div class="search-items">
			{#each searchResults as item, i}
				<SearchItem data={item} on:pageChange={handlePageChange} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		width: 100%;
	}
	.search {
		display: flex;
		flex: 1;
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
</style>
