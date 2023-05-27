import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';
import { flattenData } from '$lib/utils/fuseSearch/flattenData';

/**
 * Returns the entity meta tree for the content folder for navigation
 * @returns Returns an array of entities that match the tag in the request body
 */
export async function POST({ request }): Promise<object> {
	const files = getEntityMetaTree('src/routes/content');
	if (!files) return new Response(JSON.stringify({ error: 'No files found' }));
	const flatFiles = flattenData(files);
	const req = await request.json();
	const { tag } = req;
	const filteredFiles = flatFiles.filter((file) =>
		file.tags?.some((fileTag) => fileTag.toLowerCase() === tag.toLowerCase())
	);
	return new Response(JSON.stringify(filteredFiles));
}
