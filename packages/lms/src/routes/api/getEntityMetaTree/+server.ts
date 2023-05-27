import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';

/**
 * Returns the entity meta tree for the content folder for navigation
 * @returns The entity meta tree
 */
export async function GET(): Promise<object> {
	const files = getEntityMetaTree('src/routes/content');

	return new Response(JSON.stringify(files));
}
