import path from 'path';
import fs from 'fs-extra';
import { copyTemplate, slugger } from '../utilities';
import { EntityBase } from '@mollify/types';

export default async function createEntity(
  entityMeta: EntityBase,
  location = process.cwd()
) {

  console.log(entityMeta);
  

  const slug = slugger(entityMeta.title);
  
  // Ensure type exists
  if (!entityMeta.type) {
    throw new Error("Entity type cannot be undefined");
  }

  // Get the entity type in lowercase
  const templateName = entityMeta.type.toLowerCase();

  // Build the destination path
  const destinationDir = path.join(location, slug);

  // Ensure the destination directory exists
  await fs.ensureDir(destinationDir);

  // Copy the template file to the destination
  await copyTemplate(templateName, destinationDir, entityMeta);
}
