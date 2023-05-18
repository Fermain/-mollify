import yaml from 'js-yaml';
import { u } from 'unist-builder';

export function createTagLinks() {
	return function (tree) {
		try {
			const doc = yaml.load(tree.children[0].value);
			const tags = doc.tags;

			if (tags && Array.isArray(tags)) {
				// Find the first h1 node
				const h1Index = tree.children.findIndex(
					(node) => node.type === 'heading' && node.depth === 1
				);

				if (h1Index !== -1) {
					// Convert tags to markdown links and insert them after the h1
					tags.forEach((tag, i) => {
						const tagLinkNode = u('html', `<a href="/tags/${tag}">${tag}</a>`);
						tree.children.splice(h1Index + 1 + i, 0, tagLinkNode);
					});
				}
			}
		} catch (e) {
			console.error(e);
		}
	};
}
