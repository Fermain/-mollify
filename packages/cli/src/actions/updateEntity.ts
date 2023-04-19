import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import type { Entity } from '../types/Entity';
import { ENTITY_FILE } from '../constants';

export default async function updateEntity(
  entity: Entity,
  frontmatter: Partial<Entity>,
  body: string | null = null,
  basePath = '',
) {
  const fileName = path.join(entity.slug, ENTITY_FILE);
  const entityPath = path.join(basePath, fileName);

  try {
    const fileContent = await fs.readFile(entityPath, 'utf8');
    const { data, content } = matter(fileContent);

    await fs.writeFile(entityPath, matter.stringify(body || content, {
      ...data,
      ...frontmatter,
    }), 'utf8');

    console.log(`Successfully updated ${entity.type} at ${entityPath}`);
  } catch (error) {
    console.error(`Error updating ${entity.type}:`, error);
  }
}
