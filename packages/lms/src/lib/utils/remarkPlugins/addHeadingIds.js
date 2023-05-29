//might need this sometimes I think the id isn't added quick enough in the layout for heading links to work.
export function addHeadingIds() {
	return function (tree) {
		try {
			tree.children.forEach((node) => {
				if (node.type === 'heading') {
					// Assume the id of the section is the same as the text of the heading
					const id = node.children[0].value.toLowerCase().replace(/\s/g, '-');

					// Add the id attribute to the h element
					node.data = {
						hProperties: {
							id: id
						}
					};
				}
			});
		} catch (e) {
			console.error(e);
		}
	};
}
