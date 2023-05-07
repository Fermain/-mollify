import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { EntityBase } from '@mollify/types';

export function getEntityFrontmatter(entityPath: string): EntityBase {
  const fileName = '+page.md';
  const contentPath = fs.existsSync(path.join(entityPath, fileName))
    ? path.join(entityPath, fileName)
    : entityPath;

  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content file does not exist: ${contentPath}`);
  }

  const content = fs.readFileSync(contentPath, 'utf-8');
  const { data } = matter(content);

  return {
    ...data,
    title: data.title,
    type: data.type,
    tags: data.tags,
    previous: data.previous,
  };
}

export default getEntityFrontmatter;
