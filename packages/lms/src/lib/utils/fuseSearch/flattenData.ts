import type { EntityMeta } from '@mollify/types';

export interface FuseItem extends Omit<EntityMeta, 'children'> {
	parent: string | null;
	refIndex?: number;
	score?: number;
	children?: FuseItem[];
}

// Flatten the data so that it can be searched
export function flattenData(data: EntityMeta[], parent: string | null = null) {
	return data.reduce((flatData: FuseItem[], item) => {
		const { children, ...itemWithoutChildren } = item;

		// Add the current item to the flattened data
		flatData.push({ ...itemWithoutChildren, parent: parent });

		// If the item has children, recursively flatten them and add them to the flattened data
		if (Array.isArray(children)) {
			flatData.push(...flattenData(children, item.title));
		}

		return flatData;
	}, []);
}
