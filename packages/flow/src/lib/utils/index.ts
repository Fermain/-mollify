export const fetchMarkdownFiles = async () => {
	const allMarkdownFiles = import.meta.glob('/src/routes/content/**/*.md');
	const iterableMarkdownFiles = Object.entries(allMarkdownFiles);

	const allFiles = await Promise.all(
		iterableMarkdownFiles.map(async ([path, resolver]) => {
			const metadata = await resolver();
			const filePath = path.slice(11, -3);

			return {
				meta: metadata,
				path: filePath
			};
		})
	);

	return allFiles;
};
