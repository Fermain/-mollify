import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function GET({ params }): Promise<object> {
	const { slug } = params;

	// Construct the path to the Markdown file
	const filePath = path.resolve('src/routes', slug, '+page.md');
	console.log(filePath);
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const { data } = matter(content);

		return {
			status: 200,
			body: {
				content: data
			}
		};
	} catch (error) {
		console.error('Error reading file:', error);

		return {
			status: 500,
			body: {
				error: 'Failed to read file'
			}
		};
	}
}
