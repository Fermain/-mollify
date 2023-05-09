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
 * Recursively parse markdown files and return an array of objects with arrays of children
 * @param dir  The directory to parse
 * @returns A nested object containing the parsed markdown files
 */
export function parseMarkdownSearch(dir: string, content = false) {
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
				currentObject = {
					...data,
					filePath,
					foldername: path.basename(currentDir),
					browserPath
				};

				if (content) {
					const { content } = matter(rawContent);
					const contentString = Array.isArray(content) ? content.join('') : content;
					currentObject.content = contentString;
				}
			}
		});

		if (children.length > 0 || currentObject.type != 'institution') {
			currentObject.children = children;
		}

		return currentObject;
	}

	const institutes = fs.readdirSync(dir);
	const data = institutes.map((institute) => {
		const instituteDir = path.join(dir, institute);
		return walkSync(instituteDir);
	});

	return data;
}
