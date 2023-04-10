import { copyTemplate } from '.';
import type { Entity } from '../types/Entity';
import path from 'path';

export async function createEntityFiles(entity: Entity, destination = '') {
  const entityType = entity.type;
  const templateName = entityType.toLowerCase();
  const fileName = `${entity.name}.md`;

  const destinationPath = path.join(destination, fileName);

  try {
    await copyTemplate(templateName, destinationPath, entity);
    console.log(
      `Successfully created a new ${entityType} at ${destinationPath}`,
    );
  } catch (error) {
    console.error(`Error creating a new ${entityType}:`, error);
  }
}
