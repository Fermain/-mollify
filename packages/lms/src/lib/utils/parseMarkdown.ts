import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the MarkdownNode interface
export interface MarkdownContentTree {
	filePath?: string;
	folderName?: string;
	dependency?: string | null;
	type?: string;
	children?: MarkdownContentTree[];
	[key: string]: unknown;
}

/**
 * Recursively parse markdown files and return a nested object
 * @param dir  The directory to parse
 * @returns A nested object containing the parsed markdown files
 */
export function parseMarkdownBetter(dir: string) {
	function sortChildrenByDependency(children: MarkdownContentTree[]): MarkdownContentTree[] {
		const sortedChildren: MarkdownContentTree[] = children.filter((child) => !child.dependency);
		const unsortedChildren: MarkdownContentTree[] = children.filter((child) => child.dependency);
		//guard against infinite loop
		let i = 0;
		while (unsortedChildren.length > 0 && i < children.length) {
			unsortedChildren.forEach((child, index) => {
				if (sortedChildren.some((sortedChild) => sortedChild.title === child.dependency)) {
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

	function walkSync(currentDir: string) {
		let currentObject: MarkdownContentTree = {};
		const children: MarkdownContentTree[] = [];
		// Get the files in the current directory
		const files = fs.readdirSync(currentDir);
		files.forEach((filename) => {
			// Create the full file path check if it is a directory or a markdown file.
			const filePath = path.join(currentDir, filename);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				// Recursively call walkSync with the current directory and the current object
				children.push(walkSync(filePath));
			} else if (path.extname(filename) === '.md') {
				// If the current item is a markdown file, read the file and parse the frontmatter
				const rawContent = fs.readFileSync(filePath, 'utf-8');
				const { data } = matter(rawContent);
				// browserPath is the path relative to the browser
				const browserPath = filePath
					.replaceAll('\\', '/')
					.replace('src/routes/content', '/content')
					.replace('+page.md', '');
				currentObject = { ...data, filePath, browserPath, folderName: path.basename(currentDir) };
			}
		});

		if (children.length > 0 || currentObject.type != 'institution') {
			currentObject.children = sortChildrenByDependency(children);
		}

		return currentObject;
	}

	const institutes = fs.readdirSync(dir);
	console.log('institutes:', institutes);
	const data = institutes.map((institute) => {
		const instituteDir = path.join(dir, institute);
		return walkSync(instituteDir);
	});

	return data;
}
