<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';

	import SearchItem from '../search/SearchItem.svelte';

	let searchQuery = '';
	let searchResults: String[] = [];
	let timer: string | number | NodeJS.Timeout | undefined;

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		goto(`/search?query=${searchQuery}`);
	}

	const debounceSearch = async () => {
		clearTimeout(timer);
		if (searchQuery.length >= 3) {
			await new Promise((resolve) => {
				timer = setTimeout(async () => {
					try {
						searchResults = await getSearchResults(searchQuery);
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
<div class="relative">
	<form class="flex" on:submit={handleSubmit}>
		<input
			class="focus:outline-none focus:ring focus:ring-primary-300/50 hidden sm:block rounded-sm w-60 pl-1"
			type="search"
			name="autocomplete-search"
			placeholder="Search markdown content"
			bind:value={searchQuery}
			on:input={async () => {
				debounceSearch();
			}}
		/>
		<button class="btn hover:bg-primary-hover-token"
			><span class="material-symbols-outlined"> search </span></button
		>
	</form>
	<div class="absolute">
		{#if searchResults.length > 0}
			<div class="card p-4 w-72 shadow-xl">
				{#each searchResults as item, i}
					<SearchItem data={item} on:pageChange={handlePageChange} />
				{/each}
			</div>
		{/if}
	</div>
</div>
