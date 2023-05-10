import fs from 'fs';
import matter from 'gray-matter';
import type { EntityBase } from '@mollify/types';

export function getEntityFrontmatter(entityPath: string, textBody = false): EntityBase {
	if (!fs.existsSync(entityPath)) {
		throw new Error(`Content file does not exist: ${entityPath}`);
	}

	const rawContent = fs.readFileSync(entityPath, 'utf-8');
	const { data, content } = matter(rawContent);
	const contentString = Array.isArray(content) ? content.join('') : content;

	const Entity: EntityBase = {
		...data,
		title: data.title,
		type: data.type,
		tags: data.tags,
		previous: data.previous,
		content: contentString
	};

	if (textBody) {
		delete Entity.content;
	}

	return Entity;
}

export default getEntityFrontmatter;
