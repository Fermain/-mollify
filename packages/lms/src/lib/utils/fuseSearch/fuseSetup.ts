import Fuse from 'fuse.js';
import { parseMarkdownSearch } from '$lib/utils/parseMarkdownSearch';

// Pass the data from the parseMarkdown function to the GraphQL context
const data = parseMarkdownSearch('src/routes/content', true);
const jsonData = JSON.stringify(data);

// function findMaxDepth(obj, depth = 0) {
// 	if (!obj.children) return depth;

// 	return Math.max(...obj.children.map((child) => findMaxDepth(child, depth + 1)));
// }

// // Assume that `data` is your array of nested objects
// const maxDepth = Math.max(...data.map((item) => findMaxDepth(item)));

// const fields = ['title', 'tags', 'content'];
// const keys = fields.flatMap((field) =>
// 	Array.from(
// 		{ length: maxDepth },
// 		(_, i) => Array.from({ length: i + 1 }, () => 'children').join('.') + '.' + field
// 	)
// );

// console.log(keys);
const options = {
	includeScore: false,
	threshold: 0.3,
	//keys,
	limit: Infinity,
	keys: [
		'title',
		'children.title',
		'children.children.title',
		'children.children.children.title',
		'children.children.children.children.title'
		// Add more levels if necessary
	]
};

const fuse = new Fuse(data, options);

export async function search(searchQuery: string, filters = {}) {
	console.log(searchQuery);
	return await fuse.search(searchQuery);

	//filter stuff
}
