import { browser } from '$app/environment';
import { toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import * as storage from '$lib/utils/storage';

export interface Bookmark {
  url: string;
  headings: string[];
}

/**
 * This function adds or removes a bookmark for the current page, or a specific heading
 * @param heading If provided, will add or remove a bookmark for the specific heading
 * @returns Updated bookmarks
 */
export async function addRemoveBookmarks(heading: string | null = null) {
  if (!browser) return;
  const currentUrl = decodeURIComponent(window.location.pathname);
  let bookmarks: Bookmark[] = storage.load('bookmarks') ? storage.load('bookmarks') : new Array<Bookmark>();
  // Try to find an existing bookmark for the current URL
  let bookmark: Bookmark | undefined = bookmarks.find((b) => b.url === currentUrl);
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
