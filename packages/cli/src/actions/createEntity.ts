import path from 'path';
import type { EntityMeta } from '@mollify/types';
import { copyTemplate } from '../utilities';
import { ENTITY_FILE } from '../constants';

export default async function createEntity(entity: EntityMeta, destination = '') {
  const templateName = entity.type.toLowerCase();
  const fileName = path.join(entity.slug, ENTITY_FILE);
  const destinationPath = path.join(destination, fileName);

  await copyTemplate(templateName, destinationPath, entity);
  console.log(
    `Successfully created a new ${entity.type} at ${destinationPath}`,
  );
}
