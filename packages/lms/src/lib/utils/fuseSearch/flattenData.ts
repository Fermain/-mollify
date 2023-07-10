import type { EntityMeta } from '@mollify/types';

export interface FuseItem extends Omit<EntityMeta, 'children'> {
  parent: string | null;
  type: string;
  refIndex?: number;
  score?: number;
  children?: FuseItem[];
  tags?: string[];
  title: string;
}

/**
 * This flattens the data for easier handling by Fuse.js
 * @param data The entity meta data to flatten
 * @param parent The parent of the current item
 * @returns The flattened data
 */
export function flattenData(data: EntityMeta[], parent: string | null = null): FuseItem[] {
  return data.flatMap((item) => {
    const { children, ...itemWithoutChildren } = item;

    // Create a new array with the current item flattened
    const flattenedItem = { ...itemWithoutChildren, parent: parent };

    // If the item has children, recursively flatten them and add them to the flattened data
    if (Array.isArray(children)) {
      const flattenedChildren: FuseItem[] = flattenData(children, item.title);
      return [flattenedItem, ...flattenedChildren];
    }

    return [flattenedItem];
  });
}
