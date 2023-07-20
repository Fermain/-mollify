import * as glob from 'glob';
import path from 'path';
import type { EntityType, EntityMeta } from '@mollify/types';
import { getEntity } from './get';

export async function listEntities(
  entityType?: EntityType,
  basePath = ''
): Promise<EntityMeta[]> {
  const pattern = path.join(basePath, '**/*', '+page.md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  // Utility function to process a single file
  const readEntityFile = async (file: string): Promise<EntityMeta | null> => {
    try {
      return await getEntity(file);
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
    return null;
  };

  // Read all files concurrently using Promise.all
  const entities = await Promise.all(files.map(readEntityFile));

  // Remove null entries and return the valid entities
  return entities.filter((entity): entity is EntityMeta => Boolean(entity)).filter(entity => entity.type === entityType);
}
