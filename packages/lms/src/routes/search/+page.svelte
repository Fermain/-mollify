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
					(file: EntityMeta) => file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
				);
				// if it does, update the value to the correct character case
				if (isMatch) {
					const fileMatch = $files.find(
						(file: EntityMeta) => file.title.toLowerCase() === processedQuery.filters.institution.toLowerCase()
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
		searchTagsString.trim() === '' ? (searchTags = []) : (searchTags = searchTagsString.split(', '));

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

	$: searchTagsString.trim() === '' ? (searchTags = []) : (searchTags = searchTagsString.split(', '));
</script>

<section class="p-4">
	<h1 class="h1 mb-8">Search</h1>
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
						value={true}
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
						<input type="checkbox" name="type" value="programme" id="programme" bind:group={searchTypes} />
						<label for="course">Courses</label>
						<input type="checkbox" name="type" value="course" id="course" bind:group={searchTypes} />
						<label for="module">Modules</label>
						<input type="checkbox" name="type" value="module" id="module" bind:group={searchTypes} />
						<label for="lesson">Lessons</label>
						<input type="checkbox" name="type" value="lesson" id="lesson" bind:group={searchTypes} />
					</fieldset>
				</div>
			</div>
			<div>
				<button class="show-option-btn" type="button">Advanced Search Options</button>
			</div>
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
		{#if searchResults.length > 0}
			<h2 class="h2 mb-8">Search results</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				{#each searchResults as result}
					<a class="card p-4 variant-ghost-surface" href={result.browserPath}>
						<header class="card-header border-b pb-2"><h3 class="h3">{result.title}</h3></header>
						<section class="p-4">
							<p>Search Score: {Math.round(result.score * 10000) / 10000}</p>
							<p>Type: {result.type}</p>
						</section>
						<footer class="card-footer border-t pt-2">
							<p class="chip variant-filled">Tags: {result.tags}</p>
						</footer>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
