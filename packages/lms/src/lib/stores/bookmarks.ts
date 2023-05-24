import { writable } from 'svelte/store';

function createBookmarksStore() {
	// Fetch existing bookmarks from localStorage
	const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};

	// Create a writable store
	const { subscribe, set, update } = writable(bookmarks);

	return {
		subscribe,
		add: (pageUrl, headingId = '') =>
			update((bookmarks) => {
				if (!bookmarks[pageUrl]) {
					bookmarks[pageUrl] = [];
				}

				if (!bookmarks[pageUrl].includes(headingId)) {
					bookmarks[pageUrl].push(headingId);
				}

				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
				return bookmarks;
			}),

		remove: (pageUrl, headingId = '') =>
			update((bookmarks) => {
				if (!bookmarks[pageUrl]) {
					return bookmarks;
				}

				const index = bookmarks[pageUrl].indexOf(headingId);

				if (index !== -1) {
					bookmarks[pageUrl].splice(index, 1);
				}

				if (bookmarks[pageUrl].length === 0) {
					delete bookmarks[pageUrl];
				}

				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
				return bookmarks;
			}),

		getAll: () => {
			return JSON.parse(localStorage.getItem('bookmarks')) || {};
		}
	};
}

export const bookmarksStore = createBookmarksStore();
