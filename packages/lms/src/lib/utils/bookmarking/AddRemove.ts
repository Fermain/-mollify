import { browser } from '$app/environment';
import { Toast, toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import * as storage from '$lib/utils/storage';

export async function AddRemoveBookmarks(headings = []) {
	if (!browser) return;
	const currentUrl = decodeURIComponent(window.location.pathname);
	let bookmarks: { url: string; headings: [] } | [] = storage.load('bookmarks') ? storage.load('bookmarks') : [];
	// Try to find an existing bookmark for the current URL
	let bookmark: { url: string; headings: [] } | null = bookmarks.find((b) => b.url === currentUrl);
	//deal with the usually svelte silliness fix

	await new Promise((resolve) => {
		if (bookmark) {
			// If a bookmark already exists, remove it
			bookmarks = bookmarks.filter((b) => b.url !== currentUrl);

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
			const toast: ToastSettings = {
				message: 'Success! Bookmark Added.',
				background: 'variant-filled-success',
				timeout: 2000
			};
			toastStore.trigger(toast);
		}

		storage.save('bookmarks', bookmarks);
		console.log('bookmarks', bookmarks);
		resolve();
	});

	return bookmarks;
}
