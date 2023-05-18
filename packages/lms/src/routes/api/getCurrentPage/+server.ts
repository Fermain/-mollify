import getEntityFrontmatter from '$lib/utils/getEntityFrontmatter.js';
import getEntitySlug from '$lib/utils/getEntitySlug.js';

export async function POST({ request }) {
	const req = await request.json();
	const { url } = req;
	const matter = await getEntityFrontmatter(`src/routes/${url}/+page.md`, true);
	matter.slug = await getEntitySlug(`src/routes/${url}/+page.md`);
	return new Response(JSON.stringify(matter));
}
