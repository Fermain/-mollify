import type { Bookmark } from '$lib/utils/bookmarking/AddRemove';
import { writable } from 'svelte/store';

export const bookmarks = writable(new Array<Bookmark>());
