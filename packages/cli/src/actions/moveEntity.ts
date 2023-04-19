import fs from 'fs-extra';
import path from 'path';
import { Entity } from '../types/Entity';
import { ENTITY_FILE } from '../constants';

export default async function moveEntity(entity: Entity, source = '', destination = '') {
  const fileName = path.join(entity.slug, ENTITY_FILE);
  const sourcePath = path.join(source, fileName);
  const destinationPath = path.join(destination, fileName);

  try {
    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.rename(sourcePath, destinationPath);
    console.log(
      `Successfully moved ${entity.type} from ${sourcePath} to ${destinationPath}`,
    );
  } catch (error) {
    console.error(`Error moving ${entity.type}:`, error);
  }
}
