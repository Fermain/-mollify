import getEntityFrontmatter from '$lib/utils/getEntityFrontmatter.js';

export async function POST({ request }) {
	const req = await request.json();
	const { url } = req;
	const matter = await getEntityFrontmatter(`src/routes/${url}/+page.md`, true);
	return new Response(JSON.stringify(matter));
}
