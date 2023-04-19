import path from 'path';
import type { Entity } from '../types/Entity';
import { copyTemplate } from '../utilities';
import { ENTITY_FILE } from '../constants';

export default async function createEntity(entity: Entity, destination = '') {
  const templateName = entity.type.toLowerCase();
  const fileName = path.join(entity.slug, ENTITY_FILE);
  const destinationPath = path.join(destination, fileName);

  try {
    await copyTemplate(templateName, destinationPath, entity);
    console.log(
      `Successfully created a new ${entity.type} at ${destinationPath}`,
    );
  } catch (error) {
    console.error(`Error creating a new ${entity.type}:`, error);
  }
}
