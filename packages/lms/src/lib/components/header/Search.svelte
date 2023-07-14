<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSearchResults } from '$lib/utils/fuseSearch/getSearchResults';
	import { parseRawSearchQuery } from '$lib/utils/fuseSearch/parseRawSearchQuery';

	let searchQuery = '';
	let searchResults: { label: string; value: string; refIndex: number; browserPath: string }[] = [];
	let timer: string | number | NodeJS.Timeout | undefined;
	let inputFocused = false;
	let returnedResults = false;
	let rawQuery = '';

	//these handle keyboard navigation
	//set to -1 so that the user can select the first search suggestion which in an array would be 0
	let selection: number = -1;
	let pathToNavigateTo: string = '';

	interface SearchResultItem {
		title: string;
		slug: string;
		refIndex: number;
	}

	function handleSubmit(event: { preventDefault: () => void }) {
		if (pathToNavigateTo === '') {
			goto(`/search?query=${encodeURIComponent(searchQuery)}`);
		} else {
			goto(pathToNavigateTo);
		}
		searchQuery = '';
		selection = -1;
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
						searchResults = results.map((result: SearchResultItem) => {
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

	function handleKeyboardNavigation(event: KeyboardEvent): void {
		const key = event.key;

		switch (key) {
			case 'ArrowDown':
				navigateSearchResults(1);
				break;
			case 'ArrowUp':
				navigateSearchResults(-1);
				break;
			case 'Backspace' || 'Delete':
				selection = -1;
				break;
			default:
				break;
		}
	}

	function navigateSearchResults(direction: number): void {
		//selects the search result
		const newSelection = selection + direction;
		if (newSelection >= 0 && newSelection < searchResults.length) {
			selection = newSelection;
		}
		//styles the selected search result
		const selectedSuggestion = searchResults[selection].refIndex;
		searchResults.forEach((result) => {
			const domElement = document.getElementById(result.refIndex.toString());
			result.refIndex === selectedSuggestion
				? domElement?.classList.add('bg-primary-300/25')
				: domElement?.classList.remove('bg-primary-300/25');
			//scrolls down if selected element isn't in view
			if (domElement && domElement?.offsetTop > 140) {
				result.refIndex === selectedSuggestion &&
					domElement?.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'start'
					});
			}
			//scrolls up if selected element isn't in view
			if (domElement && domElement?.offsetTop < 140) {
				result.refIndex === selectedSuggestion &&
					domElement?.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'start'
					});
			}

			if (result.refIndex === selectedSuggestion) {
				pathToNavigateTo = result.browserPath;
			}
		});
	}

	function handlePageChange() {
		setTimeout(() => {
			searchResults = [];
			searchQuery = '';
			selection = -1;
		}, 10);
	}

	function handleClickOutside(event: MouseEvent | TouchEvent) {
		const target = event.target as Element;

		if (!target.closest('.wrapper') && !target.closest('.search-items')) {
			handlePageChange();
		}
	}

	function handleSearchSelection(path: string) {
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
					id={item.refIndex.toString()}
					class="hover:bg-primary-hover-token rounded-container-token cursor-pointer"
					on:click={() => {
						handleSearchSelection(item.browserPath);
					}}
					on:keydown={handleKeyboardNavigation}
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
