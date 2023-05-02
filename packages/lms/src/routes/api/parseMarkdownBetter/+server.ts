import { parseMarkdownBetter } from '$lib/utils/parseMarkdownBetter';

export async function GET(): Promise<object> {
	const files = parseMarkdownBetter('src/routes/content');

	return new Response(JSON.stringify(files));
}
