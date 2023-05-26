import { u } from 'unist-builder';

export function addHeadingIcons() {
	return function (tree) {
		try {
			tree.children.forEach((node) => {
				if (node.type === 'heading') {
					// Assume the id of the section is the same as the text of the heading
					const id = node.children[0].value.toLowerCase().replace(/\s/g, '-');

					// Create a link icon next to the heading
					const linkIconNode = u(
						'html',
						`<a id="${id}" href="#${id}" class="text-primary-500 no-underline mx-1"><i class="icon-f">link</i></a><button><i class="icon-f" onclick="addBookmark('${id}');">bookmark_add</i></button>`
					);

					// Append link icon to the heading
					node.children.push(linkIconNode);
				}
			});
		} catch (e) {
			console.error(e);
		}
	};
}
