import { graphql } from 'graphql';
import { schema, resolvers } from '$lib/graphql/graphql-schema';
import { parseMarkdownSearch } from '$lib/utils/parseMarkdownSearch';

// Pass the data from the parseMarkdown function to the GraphQL context
const data = parseMarkdownSearch('src/routes/content');
console.log('data:', data);

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
