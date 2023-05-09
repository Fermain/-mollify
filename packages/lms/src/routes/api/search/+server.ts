// import { graphql } from 'graphql';
// import { schema, resolvers } from '$lib/utils/graphql/graphQLSchema';
import { search } from '$lib/utils/fuseSearch/fuseSetup';

export async function POST({ request }) {
	const { searchQuery, filters } = await request.json();
	const response = await search(searchQuery, filters);

	return new Response(JSON.stringify(response));
}

// export async function POST({ request }) {
// 	const { query, variables } = await request.json();

// 	const response = await graphql({
// 		schema,
// 		source: query,
// 		variableValues: variables,
// 		contextValue: { data },
// 		rootValue: resolvers
// 	});

// 	return new Response(JSON.stringify(response));
// }
