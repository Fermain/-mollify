<script lang="ts">
	import { goto } from '$app/navigation';
	import { search } from '$lib/utils/graphql/getSearchResults';
	let searchQuery = '';
	let searchResults = [];

	async function updateSearchResults() {
		searchResults = await search(searchQuery);
		console.log(searchQuery);
		console.log(searchResults);
	}

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		console.log(event);
		goto(`/search?query=${searchQuery}`);
	}
</script>

<form class="search" on:submit={handleSubmit}>
	<input
		type="search"
		placeholder="Search markdown content"
		bind:value={searchQuery}
		on:input={async () => {
			updateSearchResults();
		}}
	/>
	<button>Search</button>
</form>

<style>
	.search {
		display: flex;
		flex: 1;
	}
</style>
