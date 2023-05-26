import fs from 'fs';

export async function get({ params }) {
	const { page } = params;
	const markdownContent = fs.readFileSync(`src/routes/content/plot/${page}.md`, 'utf-8');

	return {
		body: {
			markdownContent
		}
	};
}
