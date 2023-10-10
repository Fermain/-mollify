import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

// a custom store for storing progress Set. will automatically save to localStorage when store is updated.
// data is stored as [ documentAddress<string>, ...]
const createProgressStore = () => {
	let store: Writable<Set<string>> = writable(new Set());

	if (browser) {
		const key = 'contentCompletionSet'
		const storedValue = localStorage.getItem(key);

		if (storedValue) store = writable(new Set(JSON.parse(storedValue)))
		store.subscribe(($storeValue) => {
			localStorage.setItem(key, JSON.stringify([...$storeValue]));
		});

	}

	return {
		...store,
		getStatus,
		setComplete
	};

	function getStatus(id: string) {
		store.subscribe(storeValue => storeValue.has(id))
	}
	function setComplete(id: string) {
		store.update(storevalue => storevalue.add(id))
	}
}


export const progressStore = createProgressStore()