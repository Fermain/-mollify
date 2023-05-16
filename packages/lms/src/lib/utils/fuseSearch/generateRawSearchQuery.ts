/**
 * Generates a raw search query from the search parameters, for use in URL
 * @param searchQuery Main search query
 * @param searchExclusions  Exclusions to apply to the search
 * @param searchTypes type of content to search for
 * @param searchTags tags to search for
 * @param selectedInstitution institution to search for
 * @param searchQueryExact whether to search for the exact query
 * @returns Raw search query
 * @example
 * const rawSearchQuery = generateRawSearchQuery('search query', 'excluded', ['type', 'search'], ['tag', 'search'], 'title search', 'institution search', true);
 * console.log(rawSearchQuery); // "search query" !excluded type:"type, search" tags:"tag, search" institution:"institution search" title:"title search"
 */
export function generateRawSearchQuery(
	searchQuery: string,
	searchExclusions: string,
	searchTypes: string[],
	searchTags: string[],
	selectedInstitution: string,
	searchQueryExact: boolean
) {
	let rawSearchQuery = searchQuery;

	if (searchQueryExact) {
		rawSearchQuery = `"${rawSearchQuery}"`;
	}

	if (searchExclusions.split(' ').length > 0 && searchExclusions.trim() !== '') {
		searchExclusions.split(' ').forEach((exclusion) => {
			rawSearchQuery += ` !${exclusion}`;
		});
	}

	if (searchTypes.length > 0) {
		rawSearchQuery += ` type:"${searchTypes.join(', ')}"`;
	}

	if (searchTags.length > 0) {
		rawSearchQuery += ` tags:"${searchTags.join(', ')}"`;
	}

	if (selectedInstitution !== 'all') {
		rawSearchQuery += ` institution:"${selectedInstitution}"`;
	}
	console.log(rawSearchQuery);
	return rawSearchQuery;
}
