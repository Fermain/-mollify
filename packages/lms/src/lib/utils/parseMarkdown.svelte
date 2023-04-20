<script lang="ts" context="module">
	import fs from 'fs';
	import path from 'path';
	import matter from 'gray-matter';

	/**
	 * Recursively parse markdown files and return a nested object
	 * @param dir  The directory to parse
	 * @returns A nested object containing the parsed markdown files
	 */
	export function parseMarkdown(dir: string) {
		function walkSync(currentDir: string, currentObject: Record<string, any> = {}) {
			// Get the files in the current directory
			const files = fs.readdirSync(currentDir);
			files.forEach((filename) => {
				// Create the full file path check if it is a directory or a markdown file.
				const filePath = path.join(currentDir, filename);
				const stat = fs.statSync(filePath);
				if (stat.isDirectory()) {
					if (!currentObject[filename]) {
						currentObject[filename] = {};
					}
					// Recursively call walkSync with the current directory and the current object
					walkSync(filePath, currentObject[filename]);
				} else if (path.extname(filename) === '.md') {
					// If the current item is a markdown file, read the file and parse the frontmatter
					const rawContent = fs.readFileSync(filePath, 'utf-8');
					const { data } = matter(rawContent);
					currentObject.description = { ...data, filePath };
				}
			});

			return currentObject;
		}

		return walkSync(dir);
	}
</script>
