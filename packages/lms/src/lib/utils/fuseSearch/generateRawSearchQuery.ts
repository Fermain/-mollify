export function generateRawSearchQuery(
	searchQuery: string,
	searchExclusions: string,
	searchTypes: string[],
	selectedInstitution: string,
	searchQueryExact: boolean
) {
	let rawSearchQuery = searchQuery;
	if (searchExclusions.split(' ').length > 0 && searchExclusions.trim() !== '') {
		searchExclusions.split(' ').forEach((exclusion) => {
			rawSearchQuery += ` !${exclusion}`;
		});
	}

	// if (searchQueryExact) {
	//   rawSearchQuery = `"${rawSearchQuery}"`;
	// }

	if (searchTypes.length > 0) {
		rawSearchQuery += ` type:${searchTypes.join(',')}`;
	}

	if (selectedInstitution !== 'all') {
		rawSearchQuery += ` institution:${selectedInstitution}`;
	}

	return rawSearchQuery;
}
