import Fuse from 'fuse.js';
import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';
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
	filters = { institution: 'all', type: [], exact: null }
) {
	const data = getEntityMetaTree('src/routes/content', true);

	//filter institution
	let dataInstitutionFilter = data;
	if (filters.institution !== 'all') {
		dataInstitutionFilter = data.filter((item) => item.title === filters.institution);
	}

	//flatten data
	const flattenedData: FuseItem[] = flattenData(dataInstitutionFilter);

	//filter type
	let dataTypeFilter = flattenedData;
	if (filters.type?.length > 0) {
		dataTypeFilter = flattenedData.filter((item) => filters.type.includes(item.type));
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
