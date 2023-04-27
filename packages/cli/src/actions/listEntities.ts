import glob from 'glob';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import type { EntityType, Entity } from '../types';

export default async function listEntities(
  entityType?: EntityType,
  basePath = ''
): Promise<Entity[]> {
  const pattern = path.join(basePath, '**/*', '+page.md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  // Utility function to process a single file
  const processFile = async (file: string): Promise<Entity | null> => {
    try {
      const fileContent = await fs.readFile(file, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      const slug = path.dirname(file).split(path.sep).pop();

      if (entityType === undefined || frontmatter.type === entityType) {
        if (slug) {
          return {
            ...frontmatter,
            title: frontmatter.title,
            slug,
            type: frontmatter.type as EntityType,
            path: file,
          };
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
    return null;
  };

  // Read all files concurrently using Promise.all
  const entities = await Promise.all(files.map(processFile));

  // Remove null entries and return the valid entities
  return entities.filter((entity): entity is Entity => Boolean(entity));
}
