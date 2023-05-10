<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import type { EntityMeta } from '@mollify/types';
	import { slide } from 'svelte/transition';

	let searchQuery = '';
	let rawSearchQuery = '';
	let searchQueryExact = false;
	let searchTypes: String[] = [];
	let searchExclusions: String = '';
	let searchResults: EntityMeta[] = [];
	let selectedInstitution = 'all';
	let open = true;

	function generateRawSearchQuery() {
		rawSearchQuery = searchQuery;
		if (searchExclusions.split(' ').length > 0) {
			searchExclusions.split(' ').forEach((exclusion) => {
				rawSearchQuery += ` !${exclusion}`;
			});
		}

		if (searchQueryExact) {
			rawSearchQuery = `"${rawSearchQuery}"`;
		}

		if (searchTypes.length > 0) {
			rawSearchQuery += ` type:(${searchTypes.join(',')})`;
		}

		console.log(rawSearchQuery);
		return rawSearchQuery;
	}

	const query = $page.url.searchParams.get('query');
	onMount(() => {
		if (query) {
			rawSearchQuery = query;
			searchQuery = query;

			updateSearchResults();
		}
	});

	function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		updateSearchResults();
		generateRawSearchQuery();
	}

	async function updateSearchResults() {
		const filters = {
			exact: searchQueryExact,
			type: searchTypes,
			institution: selectedInstitution,
			exclusions: searchExclusions.trim() !== '' ? searchExclusions.split(' ') : [],
			programme: 'all'
		};
		console.log(filters);
		searchResults = await getSearchResults(searchQuery, filters);
	}

	function toggleOpen(): void {
		open = !open;
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
				<input type="search" placeholder="Search Terms" bind:value={searchQuery} />
			</div>
			{#if open}
				<div class="search-options" transition:slide={{ duration: 300 }}>
					<div>
						<label for="search-exact">Exact Match</label>
						<input
							type="checkbox"
							placeholder="Search markdown content"
							value={true}
							id="search-exact"
							bind:checked={searchQueryExact}
						/>
					</div>
					<div>
						<label for="search-exclusions">Excluded Terms</label>
						<input
							type="search"
							placeholder="Exclude terms, eg: term1 term2"
							bind:value={searchExclusions}
							id="search-exclusions"
						/>
					</div>
					{#if $files?.length > 1}
						<div>
							<label for="select-institution">Institution</label>
							<select bind:value={selectedInstitution} id="select-institution">
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
			{/if}
			<div>
				<button class="show-option-btn" type="button" on:click={toggleOpen}
					>Advanced Search Options</button
				>
			</div>
			<button type="submit" class="search-btn">Search</button>
		</form>
	</div>
	<div class="results-container">
		{#if searchResults}
			{#each searchResults as result}
				<div class="result">
					<h3>{result.title}</h3>
					<p>Search Score:{Math.round(result.score * 10000) / 10000}</p>
					<p>Type: {result.type}</p>
					<a class="result-btn" href={result.browserPath}>View Details</a>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	.search-wrapper {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-m);
	}
	.result-btn,
	.search-btn {
		background-color: var(--secondary);
		color: var(--text-primary);
		margin: auto;
	}

	.result-btn:hover,
	.search-btn:hover {
		background-color: var(--text-primary);
		color: var(--secondary);
	}

	.result-btn {
		display: block;
		padding: var(--spacing-s) var(--spacing-m);
		border-radius: var(--spacing-s);
		align-self: center;
		margin: auto;
		width: fit-content;
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

	.result {
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: var(--spacing-m);
		border-radius: var(--spacing-m);
	}

	.results-container {
		padding: 0.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 1rem;
	}
</style>
