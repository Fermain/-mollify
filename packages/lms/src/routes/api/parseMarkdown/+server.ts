import { parseMarkdown } from '$lib/utils/parseMarkdown.svelte';

export async function GET(): Promise<object> {
	const files = parseMarkdown('src/routes/content');

	return new Response(JSON.stringify(files));
}
