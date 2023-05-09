<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import type { EntityMeta } from '@mollify/types';
	let searchQuery = '';
	let searchQueryExact = false;
	let searchTypes: String[] = [];
	let searchResults: EntityMeta[] = [];
	let selectedInstitution = 'all';

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
		const filters = {
			exact: searchQueryExact,
			type: searchTypes,
			institution: selectedInstitution
		};
		console.log('Filters:', filters);
		searchResults = await getSearchResults(searchQuery, filters);
	}

	$: selectedInstitution;
	$: searchTypes;
	$: searchResults;
	$: query;
	$: $page.url.searchParams.get('query');
	$: $files;
</script>

<section>
	<h1>Search</h1>
	<div class="search-wrapper">
		<form class="search" on:submit={handleSubmit}>
			<div>
				<label for="search">Search Query</label>
				<input type="search" placeholder="Search markdown content" bind:value={searchQuery} />
			</div>
			<div class="search-options">
				<div>
					<label for="search-exact">Exact Match</label>
					<input
						type="checkbox"
						placeholder="Search markdown content"
						value="true"
						id="search-exact"
						bind:checked={searchQueryExact}
					/>
				</div>
				{#if $files?.length > 1}
					<div>
						<label>Institution</label>
						<select bind:value={selectedInstitution}>
							<option value="all">All</option>
							{#each $files as file}
								<option value={file.foldername}>{file.title}</option>
							{/each}
						</select>
					</div>
				{/if}
				<div>
					<fieldset>
						<legend>Search Type</legend>
						<label for="programme">Programmes</label>
						<input
							type="checkbox"
							name="type"
							value="programme"
							id="programme"
							bind:group={searchTypes}
						/>
						<label for="course">Courses</label>
						<input
							type="checkbox"
							name="type"
							value="course"
							id="course"
							bind:group={searchTypes}
						/>
						<label for="module">Modules</label>
						<input
							type="checkbox"
							name="type"
							value="module"
							id="module"
							bind:group={searchTypes}
						/>
						<label for="lesson">Lessons</label>
						<input
							type="checkbox"
							name="type"
							value="lesson"
							id="lesson"
							bind:group={searchTypes}
						/>
					</fieldset>
				</div>
			</div>
			<div>
				<button class="show-option-btn" type="button">Advanced Search Options</button>
			</div>
			<button type="submit" class="search-btn">Search</button>
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

	.search-wrapper {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-m);
	}
	.search-btn {
		background-color: var(--secondary);
		color: var(--text-primary);
		margin: auto;

		:hover {
			background-color: var(--text-primary);
			color: var(--secondary);
		}
	}

	.show-option-btn {
		border: none;
		background-color: transparent;
		color: var(--text-primary);
		text-decoration: underline;
		margin-left: auto;
	}
	.search > div,
	.search-options > div {
		margin-bottom: var(--spacing-m);
	}
</style>
