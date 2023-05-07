import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortChildrenByDependency } from './sortChildrenByDependency';
import type { EntityMeta } from '@mollify/types';

/**
 * Recursively parse markdown files and return an array of objects with arrays of children
 * @param dir  The directory to parse
 * @returns A nested object containing the parsed markdown files
 */
export function parseMarkdown(dir: string) {
	function walkSync(currentDir: string) {
		let currentObject = {} as EntityMeta;
		const children: EntityMeta[] = [];
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
					...(data as Partial<EntityMeta>),
					slug: data.slug || path.basename(currentDir).replaceAll(' ', '-').toLowerCase(),
					type: data.type,
					title: data.title || 'Untitled',
					tags: data.tags || [],
					address: filePath,
					foldername: path.basename(currentDir),
					browserPath,
					children: []
				};
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
