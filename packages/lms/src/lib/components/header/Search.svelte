<script lang="ts">
	let searchQuery = '';
	let searchResults = [];

	async function search() {
		const query = `
    query SearchMarkdown($filter: String) {
      searchMarkdown(filter: $filter) {
        title
        browserPath
      }
    }
  `;

		const variables = {
			filter: searchQuery
		};

		const response = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables })
		});

		const data = await response.json();
		console.log(data);
		if (errors) {
			console.log(error);
			console.error('GraphQL errors:', errors);
		} else {
			searchResults = data.searchMarkdown;
		}
	}
</script>

<form class="search">
	<input
		type="search"
		placeholder="Search markdown content"
		bind:value={searchQuery}
		on:input={search}
	/>
	<button>Search</button>
</form>

<style>
	.search {
		display: flex;
		flex: 1;
	}
</style>
