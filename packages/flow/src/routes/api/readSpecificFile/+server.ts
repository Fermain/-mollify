/* import fs from 'fs';
import marked from 'marked';

export async function GET(req, res) {
	const { fileName } = req.params;
	const filePath = `src/routes/${fileName}`;

	try {
		const markdownContent = fs.readFileSync(filePath, 'utf-8');

		console.log(markdownContent);
		const htmlContent = marked(markdownContent);

		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end(htmlContent);
	} catch (error) {
		console.error(error);
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end('Error reading file');
	}
} */
