import type { EntityMeta } from '@mollify/types';

/**
 * Recursively get the current object from the path
 * @param obj the object to search
 * @param keys the keys to search for
 */
export function getCurrent(contentArray: EntityMeta[], keys: string[]): EntityMeta | undefined {
	if (!contentArray || !keys || keys.length === 0 || contentArray.length === 0) {
		return undefined;
	}

	const currentObject = contentArray.filter((item) => item.title === keys[0]);

	if (currentObject.length === 0 || currentObject.length > 1) {
		return undefined;
	}

	// If the current object is a course, module, or lesson, return it
	if (currentObject[0].type == 'course') {
		return currentObject[0];
	}

	if (currentObject[0].foldername === keys[0] && keys.length !== 1) {
		if (currentObject[0].children) {
			const rest = keys.slice(1);
			const child = currentObject[0].children.filter((child) => child.title === rest[0]);
			if (child.length === 0 || child.length > 1) {
				return undefined;
			}
			return getCurrent(child, rest);
		}
	} else if (currentObject[0].foldername === keys[0]) {
		return currentObject[0];
	}

	return undefined;
}
