import { parseMarkdown } from '$lib/utils/parseMarkdown';

export async function GET(): Promise<object> {
	const files = parseMarkdown('src/routes/content');

	return new Response(JSON.stringify(files));
}
