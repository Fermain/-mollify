import { buildSchema } from 'graphql';

const typeDefs = `
  type MarkdownNode {
    filePath: String
    folderName: String
    dependency: String
    type: String
    children: [MarkdownNode]
    title: String
		tags:[String]
    browserPath: String
  }

  type Query {
    searchMarkdown(filter: String): [MarkdownNode]
  }
`;

export const schema = buildSchema(typeDefs);

export const resolvers = {
	searchMarkdown: (args, context) => {
		// Implement the search logic based on the filter value from 'args.filter'.
		// Use the data from the parseMarkdown function.
		const filter = args.filter.toLowerCase();
		const searchType = args.type || null;
		const data = context.data;

		function search(nodes) {
			const results = [];
			for (const node of nodes) {
				if (node.title && node.title.toLowerCase().includes(filter)) {
					results.push(node);
				} else if (node.tags && node.tags.some((tag) => tag.toLowerCase().includes(filter))) {
					results.push(node);
				}

				if (node.children) {
					results.push(...search(node.children));
				}
			}
			return results;
		}

		return search(data);
	}
};
