export async function getSearchResults(searchQuery: string, fitlers = {}) {
	const response = await fetch('/api/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ searchQuery, fitters: {} })
	});

	const data = await response.json();

	return await data;
}
