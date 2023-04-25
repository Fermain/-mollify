/**
 * Recursively get the current object from the path
 * @param obj the object to search
 * @param keys the keys to search for
 */
export function getCurrent(obj: any, keys: string[]): any {
	if (!obj) {
		return undefined;
	}

	if (keys.length === 0) {
		return obj;
	}

	// If the current object is a course, return it
	if (obj.frontmatter?.type === 'Course') {
		return obj;
	}

	const [key, ...rest] = keys;
	return getCurrent(obj[key], rest);
}
