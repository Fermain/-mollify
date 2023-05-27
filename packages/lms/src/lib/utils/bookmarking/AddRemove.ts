import { browser } from '$app/environment';
import { toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import * as storage from '$lib/utils/storage';

export async function AddRemoveBookmarks(heading: string | null = null) {
	if (!browser) return;
	const currentUrl = decodeURIComponent(window.location.pathname);
	let bookmarks: { url: string; headings: string[] }[] = storage.load('bookmarks') ? storage.load('bookmarks') : [];
	// Try to find an existing bookmark for the current URL
	let bookmark: { url: string; headings: string[] } | undefined = bookmarks.find((b) => b.url === currentUrl);
	//deal with the usually svelte silliness fix

	await new Promise<void>((resolve) => {
		if (bookmark) {
			if (heading === null) {
				// If a bookmark already exists, remove it
				bookmarks = bookmarks.filter((b) => b.url !== currentUrl);

				const toast: ToastSettings = {
					message: 'All Bookmarks Removed For This Page.',
					background: 'variant-filled-tertiary',
					timeout: 2000
				};
				toastStore.trigger(toast);
			} else {
				if (bookmark.headings.includes(heading)) {
					bookmark.headings = bookmark.headings.filter((h) => h !== heading);
					const toast: ToastSettings = {
						message: 'Bookmark Removed.',
						background: 'variant-filled-tertiary',
						timeout: 2000
					};
					toastStore.trigger(toast);
				} else {
					bookmark.headings.push(heading);
					const toast: ToastSettings = {
						message: 'Bookmark Added.',
						background: 'variant-filled-success',
						timeout: 2000
					};
					toastStore.trigger(toast);
				}
			}
		} else {
			// If no bookmark exists, add one
			bookmark = {
				url: currentUrl,
				headings: heading === null ? [] : [heading]
			};
			bookmarks.push(bookmark);
			const toast: ToastSettings = {
				message: 'Bookmark Added.',
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
