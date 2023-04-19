import path from 'path';
import fs from 'fs-extra';
import type { Entity } from '../types/Entity';
import { ENTITY_FILE } from '../constants';

export default async function removeEntity(entity: Entity, basePath = '') {
  const fileName = path.join(entity.slug, ENTITY_FILE);
  const entityPath = path.join(basePath, fileName);

  try {
    await fs.remove(entityPath);
    console.log(`Successfully removed ${entity.type} at ${entityPath}`);
  } catch (error) {
    console.error(`Error removing ${entity.type}:`, error);
  }
}
