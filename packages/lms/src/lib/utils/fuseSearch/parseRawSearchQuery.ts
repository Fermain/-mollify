/**
 * Parses a raw search query into a query string and filters object
 * @param rawSearchQuery String to parse
 * @returns	Query string and filters object
 * @example
 * const { query, filters } = parseRawSearchQuery('!excluded "exact search" title:"title search" institution:"institution search" type:"type, search" tags:"tag, search"');
 * console.log(query); // "exact search"
 * console.log(filters.exclusions); // ["excluded"]
 * console.log(filters.title); // "title search"
 * console.log(filters.institution); // "institution search"
 * console.log(filters.types); // ["type", "search"]
 * console.log(filters.tags); // ["tag", "search"]
 * console.log(filters.exact); // true
 */
export function parseRawSearchQuery(rawSearchQuery: string) {
	let query = '';
	const filters: {
		exclusions: string[];
		types: string[];
		tags: string[];
		institution: string;
		exact: boolean;
	} = {
		exclusions: [],
		types: [],
		tags: [],
		institution: '',
		exact: false
	};

	// carve out the various filters
	const institutionMatch = rawSearchQuery.match(/institution:"([^"]*)"/);
	if (institutionMatch) {
		filters.institution = institutionMatch[1];
		rawSearchQuery = rawSearchQuery.replace(/institution:"([^"]*)"/, '');
	}

	if (filters.institution === '') {
		filters.institution = 'all';
	}

	const typeMatch = rawSearchQuery.match(/types:"([^"]*)"/);
	if (typeMatch) {
		filters.types = typeMatch[1].split(', ');
		rawSearchQuery = rawSearchQuery.replace(/types:"([^"]*)"/, '');
	}

	const tagsMatch = rawSearchQuery.match(/tags:"([^"]*)"/);
	if (tagsMatch) {
		filters.tags = tagsMatch[1].split(', ');
		rawSearchQuery = rawSearchQuery.replace(/tags:"([^"]*)"/, '');
	}

	// Split remaining string by space to get words, but don't split spaces inside quotes
	const words = rawSearchQuery.match(/(?:[^\s"]+|"[^"]*")+/g);

	if (words) {
		// Process each word
		for (const word of words) {
			if (word.startsWith('!')) {
				filters.exclusions.push(word.slice(1));
			} else {
				query += word + ' ';
			}
		}
		query = query.trim();
	}

	// Remove quotes if they exist and apply exact search??
	const startsAndEndsWithQuotes = /^".*"$/;
	if (query.match(startsAndEndsWithQuotes)) {
		query = query.slice(1, -1);
		filters.exact = true;
	}

	return { query, filters };
}
