import Fuse from 'fuse.js';
import { parseMarkdownSearch } from '$lib/utils/parseMarkdownSearch';
import { stopWords } from './stopWords';

// Pass the data from the parseMarkdown function to the GraphQL context
const data = parseMarkdownSearch('src/routes/content', true);

// Flatten the data so that it can be searched
function flattenData(data, parent = null) {
	return data.reduce((flatData, item) => {
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

const flattenedData = flattenData(data);

const options = {
	includeScore: false,
	// threshold 0 is more strict, 1 is more loose
	threshold: 0.3,
	limit: Infinity,
	keys: [
		{ name: 'title', weight: 0.7 },
		{ name: 'tags', weight: 0.25 },
		{ name: 'content', weight: 0.05 }
	]
};

const fuse = new Fuse(flattenedData, options);

function removeStopWords(text) {
	return text
		.split(' ')
		.filter((word) => !stopWords.has(word.toLowerCase()))
		.join(' ');
}

export async function search(searchQuery: string, filters = {}) {
	//remove stop words
	searchQuery = removeStopWords(searchQuery);
	const searchResults = await fuse.search(searchQuery);

	//filter stuff
	const filterStuff = searchResults;

	const reducedData = filterStuff.reduce((array, item) => {
		item.item.refIndex = item.refIndex;
		delete item.item.content;
		delete item.item.filePath;
		array.push(item.item);
		return array;
	}, []);

	return reducedData;
}
