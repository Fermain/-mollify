<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getLocalStorage, setLocalStorage } from '$lib/utils/bookmarking/localStorage';
	import * as storage from '$lib/utils/storage';
	import { page } from '$app/stores';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let bookmarks: [{ url: string; headings: [] }] | [] = [];
	let hasBookmarks = false;
	let currentUrl = '';

	$: hasBookmarks;
	$: bookmarks;
	$: page.subscribe((p) => {
		if (browser) {
			currentUrl = decodeURIComponent(window.location.pathname);
			hasBookmarks = bookmarks.some((b) => b.url === currentUrl);
		}
	});

	onMount(async () => {
		if (browser) {
			bookmarks = storage.load('bookmarks') ? storage.load('bookmarks') : [];
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

				hasBookmarks = false;
				const toast: ToastSettings = {
					message: 'All Bookmarks Removed For This Page.',
					background: 'variant-filled-tertiary',
					timeout: 2000
				};
				toastStore.trigger(toast);
			} else {
				// If no bookmark exists, add one
				bookmark = {
					url: currentUrl,
					headings: headings
				};
				bookmarks.push(bookmark);
				hasBookmarks = true;
				const toast: ToastSettings = {
					message: 'Success! Bookmark Added.',
					background: 'variant-filled-success',
					timeout: 2000
				};
				toastStore.trigger(toast);
			}
			storage.save('bookmarks', bookmarks);
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
