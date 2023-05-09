import Fuse from 'fuse.js';
import { parseMarkdownSearch } from '$lib/utils/parseMarkdownSearch';
import type { EntityMeta } from '@mollify/types';
import { stopWords } from './stopWords';

interface FuseItem extends Omit<EntityMeta, 'children'> {
	parent: string | null;
	refIndex?: number;
	score?: number;
	children?: FuseItem[];
}

// Flatten the data so that it can be searched
function flattenData(data: EntityMeta[], parent: string | null = null) {
	return data.reduce((flatData: FuseItem[], item) => {
		const { children, ...itemWithoutChildren } = item;

		// Add the current item to the flattened data
		flatData.push({ ...itemWithoutChildren, parent: parent });

		// If the item has children, recursively flatten them and add them to the flattened data
		if (Array.isArray(children)) {
			flatData.push(...flattenData(children, item.title));
		}

		return flatData;
	}, []);
}

const options = {
	includeScore: true,
	// threshold 0 is more strict, 1 is more loose
	threshold: 0.3,
	limit: Infinity,
	keys: [
		{ name: 'title', weight: 0.7 },
		{ name: 'tags', weight: 0.25 },
		{ name: 'content', weight: 0.05 }
	]
};

function removeStopWords(text) {
	return text
		.split(' ')
		.filter((word) => !stopWords.has(word.toLowerCase()))
		.join(' ');
}

export async function search(
	searchQuery: string,
	filters = { institution: 'all', type: [], exact: null }
) {
	const data = parseMarkdownSearch('src/routes/content', true);

	//console.log(filters.institution);
	//filter institution
	let dataInstitutionFilter = data;
	if (filters.institution !== 'all') {
		dataInstitutionFilter = data.filter((item) => item.title === filters.institution);
	}

	//flatten data
	const flattenedData: FuseItem[] = flattenData(dataInstitutionFilter);

	//filter type
	let dataTypeFilter = flattenedData;
	console.log(filters.type);
	if (filters.type?.length > 0) {
		dataTypeFilter = flattenedData.filter((item) => filters.type.includes(item.type));
	}

	const fuse = new Fuse(dataTypeFilter, options);

	//remove stop words
	searchQuery = removeStopWords(searchQuery);
	const searchResults = await fuse.search(searchQuery);

	//filter stuff
	const filterStuff = searchResults;

	const reducedData = filterStuff.reduce((array, item) => {
		item.item.refIndex = item.refIndex;
		item.item.score = item.score;
		delete item.item.content;
		delete item.item.filePath;
		array.push(item.item);
		return array;
	}, []);

	return reducedData;
}
