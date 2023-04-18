import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function parseMarkdown(dir: string) {
	function walkSync(
		currentDir: string,
		fileList: Record<string, Record<string, Record<string, any[]>>> = {}
	) {
		const files = fs.readdirSync(currentDir);

		files.forEach((filename) => {
			const filePath = path.join(currentDir, filename);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				walkSync(filePath, fileList);
			} else if (path.extname(filename) === '.md') {
				const rawContent = fs.readFileSync(filePath, 'utf-8');
				const { data } = matter(rawContent);

				const filePathSegments = filePath.split(path.sep);
				const subject = filePathSegments[filePathSegments.length - 4];
				const course = filePathSegments[filePathSegments.length - 3];
				const module = filePathSegments[filePathSegments.length - 2];

				if (!fileList[subject]) {
					fileList[subject] = {};
				}

				if (!fileList[subject][course]) {
					fileList[subject][course] = {};
				}

				if (!fileList[subject][course][module]) {
					fileList[subject][course][module] = [];
				}

				fileList[subject][course][module].push({
					...data,
					filePath
				});
			}
		});

		return fileList;
	}

	console.log(JSON.stringify(walkSync(dir), null, 2));
	return walkSync(dir);
}

export async function GET(): Promise<any> {
	const files = parseMarkdown('src/routes/content');

	return new Response(JSON.stringify(files));
}
