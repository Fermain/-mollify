import type { EntityMeta } from '@mollify/types';

export function sortChildrenByDependency(children: EntityMeta[]): EntityMeta[] {
	const sortedChildren: EntityMeta[] = children.filter((child) => !child.previous);
	const unsortedChildren: EntityMeta[] = children.filter((child) => child.previous);
	//guard against infinite loop
	let i = 0;
	while (unsortedChildren.length > 0 && i < children.length) {
		unsortedChildren.forEach((child, index) => {
			if (sortedChildren.some((sortedChild) => sortedChild.title === child.previous)) {
				sortedChildren.push(child);
				unsortedChildren.splice(index, 1);
			}
		});
		i++;
	}

	// If there are still unsorted children, add them to the end of the array, not ideal but better than an infinite loop.
	if (unsortedChildren.length > 0) {
		sortedChildren.push(...unsortedChildren);
	}

	return sortedChildren;
}
