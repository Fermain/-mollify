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
		searchResults = await getSearchResults(searchQuery, filters);
	}

	$: selectedInstitution;
	$: searchTypes;
	$: searchResults;
	$: query;
	$: $page.url.searchParams.get('query');
	$: $files;
</script>

<section class="p-4">
	<h1 class="h1 mb-8">Search</h1>
	<div class="search-wrapper">
		<form class="search" on:submit={handleSubmit}>
			<label class="label flex flex-col" for="search">
				<span class="font-medium">Search query</span>
				<input
					class="input sm:w-2/4"
					type="search"
					id="search"
					placeholder="Search markdown content"
					bind:value={searchQuery}
				/>
			</label>
			<label class="flex items-center space-x-2 mt-1 mb-6" for="search-exact">
				<input
					class="checkbox"
					type="checkbox"
					value={true}
					id="search-exact"
					bind:checked={searchQueryExact}
				/>
				<p>Exact Match</p>
			</label>
			<div class="search-options">
				{#if $files?.length > 1}
					<label class="label font-medium" for="institution-options">Institution</label>
					<select
						class="select mt-1 rounded-md sm:w-2/4"
						bind:value={selectedInstitution}
						id="institution-options"
					>
						<option value="all">All</option>
						{#each $files as file}
							<option value={file.foldername}>{file.title}</option>
						{/each}
					</select>
				{/if}
				<div class="my-6">
					<span class="label font-medium">Search type</span>
					<div class="flex gap-4 flex-wrap">
						<label class="flex items-center space-x-2 mt-1" for="programme">
							<input
								class="checkbox"
								type="checkbox"
								name="type"
								value="programme"
								id="programme"
								bind:group={searchTypes}
							/>
							<p>Programmes</p>
						</label>

						<label class="flex items-center space-x-2 mt-1" for="course">
							<input
								class="checkbox"
								type="checkbox"
								name="type"
								value="course"
								id="course"
								bind:group={searchTypes}
							/>
							<p>Courses</p>
						</label>

						<label class="flex items-center space-x-2 mt-1" for="module">
							<input
								class="checkbox"
								type="checkbox"
								name="type"
								value="module"
								id="module"
								bind:group={searchTypes}
							/>
							<p>Modules</p>
						</label>

						<label class="flex items-center space-x-2 mt-1" for="lesson">
							<input
								class="checkbox"
								type="checkbox"
								name="type"
								value="lesson"
								id="lesson"
								bind:group={searchTypes}
							/>
							<p>Lessons</p>
						</label>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap my-8 gap-4">
				<button type="submit" class="btn variant-filled-primary">Search</button>
				<div>
					<button class="btn variant-outline-primary variant-filled-secondary" type="button"
						>Advanced Search Options</button
					>
				</div>
			</div>
		</form>
	</div>
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
							<span class="chip variant-filled">Cool</span>
							<span class="chip variant-filled">Noice</span>
							<span class="chip variant-filled">Give me more</span>
						</footer>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
