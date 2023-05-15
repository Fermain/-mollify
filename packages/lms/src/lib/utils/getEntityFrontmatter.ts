import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { EntityBase } from '@mollify/types';

export function getEntityFrontmatter(entityPath: string): EntityBase {
  if (!fs.existsSync(entityPath)) {
    throw new Error(`Content file does not exist: ${entityPath}`);
  }

  const content = fs.readFileSync(entityPath, 'utf-8');
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
