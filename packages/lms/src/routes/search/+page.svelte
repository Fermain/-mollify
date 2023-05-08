<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { search } from '$lib/utils/graphql/getSearchResults';

	let searchQuery = '';
	let searchResults = [];

	const query = $page.url.searchParams.get('query');
	onMount(() => {
		if (query) {
			searchQuery = query;
			updateSearchResults();
		}
	});

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		updateSearchResults();
	}

	async function updateSearchResults() {
		searchResults = await search(searchQuery);
		console.log('Results:', searchResults);
	}

	$: searchResults;
	$: query;
	$: $page.url.searchParams.get('query');
</script>

<section>
	<h1>Search</h1>
	<div class="filter-options">
		<form class="search" on:submit={handleSubmit}>
			<input type="search" placeholder="Search markdown content" bind:value={searchQuery} />
			<button>Search</button>
		</form>
	</div>
	<div class="results-container">
		{#if searchResults}
			{#each searchResults as result}
				<div class="result">
					<h3>{result.title}</h3>
					<a href={result.browserPath}>View Details</a>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	main {
		padding-top: var(--spacing-xl);
		min-height: 100vh;
		grid-area: main;
	}
</style>
