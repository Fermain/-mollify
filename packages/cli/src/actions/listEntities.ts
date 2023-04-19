import glob from 'glob';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs/promises';
import type { EntityType, Entity } from '../types';

export default async function getEntities(entityType: EntityType, basePath = ''): Promise<Entity[]> {
  const pattern = path.join(basePath, '*', '+page.md');
  const files = glob.sync(pattern);

  const entities: Entity[] = [];

  for (const file of files) {
    try {
      const fileContent = await fs.readFile(file, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      const slug = path.dirname(file).split(path.sep).pop();

      if (frontmatter.type === entityType && slug) {
        entities.push({
          name: frontmatter.name,
          slug,
          type: entityType,
          ...frontmatter,
        });
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return entities;
}
