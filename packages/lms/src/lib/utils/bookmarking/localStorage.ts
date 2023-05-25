export function getLocalStorage(key: string) {
	// We are in a server environment, so return a default value unless in browser
	if (typeof window === 'undefined') {
		return [];
	}
	const item: string | null = localStorage.getItem(key);
	// If the item is a JSON string, parse it. If not, return an empty array.
	try {
		return item ? JSON.parse(item) : [];
	} catch (e) {
		return [];
	}
}
export function setLocalStorage(key: string, value: any) {
	if (typeof window === 'undefined') {
		return [];
	}

	localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorage(key: string) {
	if (typeof window === 'undefined') {
		return [];
	}

	if (localStorage.getItem(key)) {
		localStorage.removeItem(key);
	}
}
