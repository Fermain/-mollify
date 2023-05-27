import yaml from 'js-yaml';
import { u } from 'unist-builder';

/**
 * This plugin creates a container for tags and appends all the tags into it and places it after the first heading on the page.
 */
export function createTagLinks() {
	return function (tree) {
		try {
			const doc = yaml.load(tree.children[0].value);
			const tags = doc.tags;

			if (tags && Array.isArray(tags)) {
				// Find the first h1 node
				const h1Index = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1);

				if (h1Index !== -1) {
					// Create a container for the tags
					let tagContainer = '<div class="flex flex-wrap">';

					// Convert tags to markdown links and add them to the container
					tags.forEach((tag, i) => {
						tagContainer += `<a href="/tags/${tag}" class="no-underline text-black leading-8 px-1 bg-blue-200 rounded-md m-1">${tag}</a>`;
					});

					// Close the container
					tagContainer += '</div>';

					// Create a node for the tag container
					const tagContainerNode = u('html', tagContainer);

					// Insert the tag container after the h1
					tree.children.splice(h1Index + 1, 0, tagContainerNode);
				}
			}
		} catch (e) {
			console.error(e);
		}
	};
}
