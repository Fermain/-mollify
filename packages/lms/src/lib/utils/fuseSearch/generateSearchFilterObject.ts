export function reverseRawSearchQuery(rawSearchQuery: string) {
	let query = '';
	const filters = {
		query: '',
		exclusions: [],
		types: [],
		institution: '',
		exact: false
	};

	// Remove quotes if they exist
	if (rawSearchQuery[0] === '"' && rawSearchQuery[rawSearchQuery.length - 1] === '"') {
		rawSearchQuery = rawSearchQuery.slice(1, -1);
	}

	// Split by space to get words, but don't split spaces inside quotes
	const words = rawSearchQuery.match(/(?:[^\s"]+|"[^"]*")+/g);
	// Proceed only if words is not null
	if (words) {
		// Process each word
		for (let word of words) {
			if (word.startsWith('!')) {
				// This is an exclusion
				filters.exclusions.push(word.slice(1));
			} else if (word.startsWith('type:')) {
				// This is a type
				filters.types = word.slice(5).split(',');
			} else if (word.startsWith('institution:')) {
				// This is an institution, remove quotes if they exist
				filters.institution = word.slice(12).replace(/"/g, '');
			} else {
				query += word + ' ';
			}
		}
		query = query.trim();
	}

	return { query, filters };
}
