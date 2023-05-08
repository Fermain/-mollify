export async function search(searchQuery: string) {
	const query = `
  query SearchMarkdown($filter: String) {
    searchMarkdown(filter: $filter) {
      title
      browserPath
      type
      children {
        title
        browserPath
        type
      }
    }
  }
`;

	const variables = {
		filter: searchQuery
	};

	const response = await fetch('/api/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query, variables })
	});

	const data = await response.json();

	if (data.errors) {
		console.log(data.error);
		console.error('GraphQL errors:', data.errors);
		return await data.errors;
	}

	return await data.data.searchMarkdown;
}
