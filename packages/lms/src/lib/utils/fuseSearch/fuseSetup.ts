import Fuse from 'fuse.js';
import { parseMarkdownSearch } from '$lib/utils/parseMarkdownSearch';
import { removeStopWords } from './removeStopWords';
import { flattenData, type FuseItem } from './flattenData';

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

export async function search(
	searchQuery: string,
	filters: {
		institution?: string;
		tags: string[];
		types: string[];
		exact: boolean;
		exclusions: string[];
	} = { institution: 'all', tags: [], types: [], exact: false, exclusions: [] }
) {
	const data = parseMarkdownSearch('src/routes/content', true);

	//filter institution
	let dataInstitutionFilter = data;
	if (filters.institution !== 'all') {
		dataInstitutionFilter = data.filter(
			(item) => item.title.toLowerCase() === filters.institution?.toLowerCase()
		);
	}

	//flatten data
	const flattenedData: FuseItem[] = flattenData(dataInstitutionFilter);

	//filter type
	let dataTypeFilter = flattenedData;
	if (filters.types?.length > 0) {
		dataTypeFilter = flattenedData.filter((item: FuseItem) => filters.types.includes(item.type));
	}

	//exact search
	if (filters.exact) {
		options.threshold = 0;
	}

	const fuse = new Fuse(dataTypeFilter, options);

	//remove stop words
	searchQuery = removeStopWords(searchQuery);

	const searchResults = await fuse.search(searchQuery);

	//filter stuff
	const reducedData = searchResults.reduce((array: FuseItem[], item: Fuse.FuseResult<FuseItem>) => {
		item.item.refIndex = item.refIndex;
		item.item.score = item.score;
		delete item.item.content;
		delete item.item.filePath;
		array.push(item.item);
		return array;
	}, []);

	let filterExclusions = reducedData;
	if (filters.exclusions?.length > 0) {
		filterExclusions = reducedData.filter((item: FuseItem) => {
			// Check for any excluded words in the title
			filters.exclusions = filters.exclusions.map((word: string) => word.toLowerCase());
			const titleWords = item.title.toLowerCase().split(' ');
			if (titleWords.some((word: string) => filters.exclusions.includes(word.toLowerCase()))) {
				return false;
			}
			// Check for any excluded tags
			if (item.tags?.some((tag: string) => filters.exclusions.includes(tag.toLowerCase()))) {
				return false;
			}
			return true;
		});
	}

	let filterTags = filterExclusions;
	if (filters.tags?.length > 0) {
		filterExclusions = filterExclusions.map((item) => ({
			...item,
			tags: item.tags?.map((tag: string) => tag.toLowerCase())
		}));
		filters.tags = filters.tags.map((tag: string) => tag.toLowerCase());

		console.log(filterExclusions[0]?.tags);
		filterTags = filterExclusions.filter((item) =>
			item.tags?.some((tag: string) => filters.tags.includes(tag.toLowerCase()))
		);
	}

	return filterTags;
}
