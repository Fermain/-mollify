import { parseMarkdown } from '$lib/utils/parseMarkdown';
import { flattenData } from '$lib/utils/fuseSearch/flattenData';

export async function POST({ request }): Promise<object> {
	const files = parseMarkdown('src/routes/content');
	if (!files) return new Response(JSON.stringify({ error: 'No files found' }));
	const flatFiles = flattenData(files);
	console.log(flatFiles);
	const req = await request.json();
	const { tag } = req;
	const filteredFiles = flatFiles.filter((file) =>
		file.tags?.some((fileTag) => fileTag.toLowerCase() === tag.toLowerCase())
	);
	return new Response(JSON.stringify(filteredFiles));
}
