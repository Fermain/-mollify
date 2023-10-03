import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { courseRelationMap } from './courseRelationMap';

// a custom store for storing progress map. will automatically save to localStorage when store is updated. 
// data is stored as [ [address<string>, <boolean>], ...]
async function localStorageProgressMapStore(key: string) {
	let map: Map<string, boolean> = new Map()
	const store = writable(map)

	if (browser) {
		const storedValue = localStorage.getItem(key);
		map = new Map(storedValue ? JSON.parse(storedValue) : await buildContentCompletionMap());
		store.subscribe(($storeValue) => {
			localStorage.setItem(key, JSON.stringify([...$storeValue]));
		});
	}

	store.set(map)

	return {
		...store,
		getStatus: (id: string) => map.get(id),
		setComplete: (id: string, value: boolean) => {
			map.set(id, value)
			store.set(map)
		}
	};
}

async function buildContentCompletionMap() {
	const map = new Map()
	const hierarchyMap = get(courseRelationMap)

	for (const [browserPath] of hierarchyMap)
		map.set(browserPath, false)
	return map;
}

export const progressMapStore = await localStorageProgressMapStore('contentCompletionMap')