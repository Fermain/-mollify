import { graphql } from 'graphql';
import { schema, resolvers } from '$lib/graphql/graphql-schema';
import { parseMarkdown } from '$lib/utils/parseMarkdown';

// Pass the data from the parseMarkdown function to the GraphQL context
const data = parseMarkdown('src/routes/content');

export async function POST({ request }) {
	const { query, variables } = await request.json();

	const response = await graphql({
		schema,
		source: query,
		variableValues: variables,
		contextValue: { data },
		rootValue: resolvers
	});

	return new Response(JSON.stringify(response));
}
