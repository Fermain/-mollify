import { search } from '$lib/utils/fuseSearch/fuseSetup';

export async function POST({ request }) {
	const req = await request.json();
	const { searchQuery, filters } = req;
	const response = await search(searchQuery, filters);

	return new Response(JSON.stringify(response));
}
