export function reverseRawSearchQuery(rawSearchQuery: string) {
	let query = '';
	const filters = {
		query: '',
		exclusions: [],
		types: [],
		institution: '',
		title: '',
		exact: false
	};

	const titleMatch = rawSearchQuery.match(/title:"([^"]*)"/);
	if (titleMatch) {
		filters.title = titleMatch[1];
		rawSearchQuery = rawSearchQuery.replace(/title:"([^"]*)"/, '');
	}

	const institutionMatch = rawSearchQuery.match(/institution:"([^"]*)"/);
	if (institutionMatch) {
		filters.institution = institutionMatch[1];
		rawSearchQuery = rawSearchQuery.replace(/institution:"([^"]*)"/, '');
	}

	if (filters.institution === '') {
		filters.institution = 'all';
	}

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
				filters.exclusions.push(word.slice(1));
			} else if (word.startsWith('type:')) {
				filters.types = word.slice(5).split(',');
			} else {
				query += word + ' ';
			}
		}
		query = query.trim();
	}

	return { query, filters };
}
