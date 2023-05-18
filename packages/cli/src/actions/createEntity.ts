import path from 'path';
import fs from 'fs-extra';
import { copyTemplate } from '../utilities';
import { EntityBase, EntityMeta } from '@mollify/types';

export default async function createEntity(
  entityMeta: EntityBase & { slug: string },
): Promise<EntityMeta> {

  console.log(entityMeta);
  
  // Ensure type exists
  if (!entityMeta.type) {
    throw new Error("Entity type cannot be undefined");
  }

  // Get the entity type in lowercase
  const templateName = entityMeta.type.toLowerCase();

  // Build the destination path
  const destinationDir = path.join(process.cwd(), entityMeta.slug);

  // Ensure the destination directory exists
  await fs.ensureDir(destinationDir);

  // Copy the template file to the destination
  await copyTemplate(templateName, destinationDir, entityMeta);

  return {
    type: entityMeta.type,
    title: entityMeta.title,
    slug: entityMeta.slug,
    address: destinationDir,
    children: [],
    tags: [],
  };
}
