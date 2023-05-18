import path from 'path';

export default function getEntitySlug(address: string): string {
	const fullPath = path.resolve(address);
	const pageFileName = '+page.md';

	if (!fullPath.endsWith(pageFileName)) {
		throw new Error(
			`Entity file does not have the expected file name: ${fullPath} [${pageFileName}]`
		);
	}

	const entityFolder = path.dirname(fullPath);
	const slug = path.basename(entityFolder);

	return slug;
}
