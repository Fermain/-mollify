<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';

	let searchQuery = '';
	let searchResults: String[] = [];
	let timer: string | number | NodeJS.Timeout | undefined;
	let inputFocused = false;
	let returnedResults = false;
	let rawQuery = '';

	function handleSubmit(event: { preventDefault: () => void }) {
		goto(`/search?query=${encodeURIComponent(searchQuery)}`);
		searchQuery = '';
	}

	const debounceSearch = async () => {
		clearTimeout(timer);
		returnedResults = false;
		if (searchQuery.length) {
			await new Promise((resolve) => {
				timer = setTimeout(async () => {
					try {
						const { query, filters } = parseRawSearchQuery(searchQuery);
						rawQuery = query;
						let results = await getSearchResults(query, filters);
						searchResults = results.map((result: AutocompleteOption[]) => {
							const { title, slug, ...other } = result;
							return { label: title, value: slug, ...other };
						});
						console.log(query, filters);
						console.log('results', searchResults);
					} catch (error) {
						console.log(error);
					}
				}, 500);
			});
		} else {
			searchResults = [];
		}
	};

	//my function

	let selected = -1;

	function handleKeyboardNavigation(event): void {
		const key = event.key;

		switch (key) {
			case 'Enter':
				// goToPage();
				break;
			case 'ArrowDown':
				navigateSearchResults(1);
				break;
			case 'ArrowUp':
				navigateSearchResults(-1);
				break;
			default:
				break;
		}
	}

	function navigateSearchResults(direction: number): void {
		const newSelected = selected + direction;
		if (newSelected >= 0 && newSelected < searchResults.length) {
			selected = newSelected;
		}

		const selectedSuggestion = searchResults[selected].refIndex;
		searchResults.forEach((result) => {
			const domElement = document.getElementById(result.refIndex);
			result.refIndex === selectedSuggestion
				? domElement?.classList.add('bg-primary-300/25')
				: domElement?.classList.remove('bg-primary-300/25');
		});
	}

	function handlePageChange() {
		setTimeout(() => {
			searchResults = [];
			searchQuery = '';
		}, 10);
	}

	function handleClickOutside(event: object) {
		if (!event.target.closest('.wrapper') && !event.target.closest('.search-items')) {
			handlePageChange();
		}
	}

	function handleSearchSelection(path) {
		goto(path);
	}

	$: searchResults;
</script>

<svelte:window on:click={handleClickOutside} />
<div class="max-w-sm relative">
	<form
		class="flex w-full sm:input-group sm:input-group-divider sm:grid-cols-[auto_1fr_auto]"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			class="input hidden sm:block w-60"
			type="search"
			name="autocomplete-search"
			placeholder="Search markdown content"
			autocomplete="off"
			bind:value={searchQuery}
			on:input={async () => {
				debounceSearch();
			}}
			on:focus={() => {
				inputFocused = true;
			}}
			on:blur={() => {
				inputFocused = false;
			}}
			on:keydown={handleKeyboardNavigation}
		/>
		<button
			class="btn hover:bg-primary-hover-token sm:variant-filled-primary sm:rounded-l-none sm:hover:bg-primary-active-token"
			><i class="icon-f">search</i></button
		>
	</form>
	{#if searchResults.length > 0}
		<dl class="list-dl w-full max-h-48 p-4 overflow-y-auto absolute bg-surface-100-800-token">
			{#each searchResults as item, i}
				<div
					id={item.refIndex}
					class="hover:bg-primary-hover-token rounded-container-token cursor-pointer"
					on:click={() => {
						handleSearchSelection(item.browserPath);
					}}
				>
					<span class="flex-auto w-full fill-current transition-transform duration-[200ms]">
						<dt class="truncate">{item.label}</dt>
					</span>
				</div>
			{/each}
		</dl>
	{/if}
	{#if searchResults.length === 0 && inputFocused && searchQuery.length >= 3 && returnedResults}
		<div class="card w-full max-h-48 p-4 overflow-y-auto absolute">
			<p>No Results Found</p>
		</div>
	{/if}
</div>
