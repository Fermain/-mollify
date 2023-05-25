<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getLocalStorage, setLocalStorage } from '$lib/utils/bookmarking/localStorage';
	import { page } from '$app/stores';

	let bookmarks: [{ url: string; headings: [] }] | [] = [];
	let hasBookmarks = false;
	let currentUrl = '';

	$: hasBookmarks;
	$: page.subscribe((p) => {
		if (browser) {
			currentUrl = decodeURIComponent(window.location.pathname);
			hasBookmarks = bookmarks.some((b) => b.url === currentUrl);
		}
	});

	onMount(async () => {
		if (browser) {
			const local = window.localStorage.getItem('bookmarks') || '[]';
			bookmarks = JSON.parse(local);
			currentUrl = decodeURIComponent(window.location.pathname);
			hasBookmarks = bookmarks.filter((b) => b.url === decodeURIComponent(window.location.pathname)).length > 0;
		}
	});

	// I want to move this but svelte is not playing ball
	function AddRemoveBookmarks(headings = []) {
		if (!browser) return;

		const currentUrl = decodeURIComponent(window.location.pathname);
		// Try to find an existing bookmark for the current URL
		let bookmark: { url: string; headings: [] } | null = bookmarks.find((b) => b.url === currentUrl);
		//deal with the usually svelte silliness fix
		setTimeout(() => {
			if (bookmark) {
				// If a bookmark already exists, remove it
				bookmarks = bookmarks.filter((b) => b.url !== currentUrl);
				setLocalStorage('bookmarks', bookmarks);
				hasBookmarks = false;
			} else {
				// If no bookmark exists, add one
				bookmark = {
					url: currentUrl,
					headings: headings
				};
				bookmarks.push(bookmark);
				setLocalStorage('bookmarks', bookmarks);
				hasBookmarks = true;
			}
			console.log('bookmarks', bookmarks);
		}, 0);
	}
</script>

<div>
	<button
		name="tile-2"
		class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token"
		on:click={(event) => AddRemoveBookmarks()}
	>
		{#if hasBookmarks}
			<div class="app-rail-tile-icon"><i class="icon-f">bookmark_remove</i></div>
		{:else}
			<div class="app-rail-tile-icon"><i class="icon-f">bookmark_add</i></div>
		{/if}
	</button>
</div>
