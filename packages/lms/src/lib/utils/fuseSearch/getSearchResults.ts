export async function getSearchResults(searchQuery: string, filters = {}) {
	const response = await fetch('/api/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ searchQuery, filters })
	});

	const data = await response.json();

	return await data;
}
