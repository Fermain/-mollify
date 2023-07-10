import getEntityFrontmatter from '$lib/utils/getEntityFrontmatter.js';
import getEntitySlug from '$lib/utils/getEntitySlug.js';
import type { RequestHandler } from './$types';

/**
 * Returns the frontmatter for the current page
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const req = await request.json();
    const { url } = req;
    const matter = getEntityFrontmatter(`src/routes/${url}/+page.md`, true);
    matter.slug = getEntitySlug(`src/routes/${url}/+page.md`);
    return new Response(JSON.stringify(matter));
  } catch (err) {
    //console.error('Error getting page:', err);
    return new Response(JSON.stringify({ error: String(err), url: '/no_audio/no-audio' }));
  }
}
