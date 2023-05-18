import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';

export async function GET(): Promise<object> {
	const files = getEntityMetaTree('src/routes/content');

	return new Response(JSON.stringify(files));
}
