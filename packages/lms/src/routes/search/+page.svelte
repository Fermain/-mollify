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

	type QueryType = {
		query: string;
		filters: FiltersType;
	};

	let searchQuery = '';
	let rawSearchQuery = '';
	let reversedSearchQuery = {};
	let searchQueryExact = false;
	let searchTypes: string[] = [];
	let searchTagsString: string = '';
	let searchTags: string[] = [];
	let searchExclusions: string = '';
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
		// fetch files if not already fetched
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
			const data = await response.json();
			files.set(data);
		}

		// Parse query string if present, update values and get search results
		if (query.trim() !== '') {
			rawSearchQuery = query;
			processedQuery = parseRawSearchQuery(rawSearchQuery);
			searchQuery = processedQuery.query;
			searchQueryExact = processedQuery.filters.exact;
			searchTypes = processedQuery.filters.types;
			searchTags = processedQuery.filters.tags;
			searchTagsString = searchTags.join(', ');
			if ($files !== null) {
				// check if institution exists
				isMatch = $files.some(
					(file: EntityMeta) =>
						file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
				);
				// if it does, update the value to the correct character case
				if (isMatch) {
					const fileMatch = $files.find(
						(file: EntityMeta) =>
							file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
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
		searchTagsString.trim() === ''
			? (searchTags = [])
			: (searchTags = searchTagsString.split(', '));

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

	$: searchTagsString.trim() === ''
		? (searchTags = [])
		: (searchTags = searchTagsString.split(', '));
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
							type="text"
							placeholder="Exclude terms, eg: term1, term2"
							bind:value={searchExclusions}
							id="search-exclusions"
						/>
					</div>
					<div>
						<label for="search-tags">Included Tags</label>
						<input
							type="text"
							placeholder="Include these tags, eg: tag1, tag2"
							bind:value={searchTagsString}
							id="search-tags"
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
	<div>
		{#if searchQuery.trim() !== ''}
			<div class="bubble term">
				<div class="key">{searchQueryExact ? 'Exact' : 'Fuzzy'}</div>
				<div>{searchQuery}</div>
			</div>
		{/if}
		{#if searchExclusions.length !== 0}
			<div class="bubble exclusion">
				<div class="key">Excludes:</div>
				<div>{searchExclusions}</div>
			</div>
		{/if}
		{#if searchTags.length !== 0}
			<div class="bubble tags">
				<div class="key">Tags:</div>
				<div>{searchTags.join(', ')}</div>
			</div>
		{/if}
		{#if searchTypes.length > 0}
			<div class="bubble type">
				<div class="key">Types:</div>
				<div>{searchTypes.join(', ')}</div>
			</div>
		{/if}
		{#if selectedInstitution !== 'all'}
			<div class="bubble institution">
				<div class="key">Institution:</div>
				<div>{selectedInstitution}</div>
			</div>
		{/if}
	</div>
	{#if searchResults.length > 0}
		<h2>Search Results</h2>
	{:else}
		<h2>No Results</h2>
	{/if}
	<div class="results-container">
		{#if searchResults}
			{#each searchResults as result}
				<div class="result">
					<h3>{result.title}</h3>
					<p>Search Score:{Math.round(result.score * 10000) / 10000}</p>
					<p>Type: {result.type}</p>
					<p>Tags: {result.tags}</p>
					<a class="result-btn" href={result.browserPath}>View Details</a>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	.term {
		background-color: rgb(114, 223, 181);
	}

	.exclusion {
		background-color: rgb(216, 122, 127);
	}

	.type {
		background-color: rgb(139, 139, 206);
	}

	.tags {
		background-color: rgb(139, 204, 206);
	}

	.institution {
		background-color: rgb(202, 201, 152);
	}

	.bubble {
		display: inline-block;
		padding: 8px 10px;
		margin: 4px;
		border-radius: 16px;
		color: black;
		font-weight: 600;
	}
	.key {
		text-align: center;
		margin-bottom: 8px;
		font-weight: 500;
	}
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
