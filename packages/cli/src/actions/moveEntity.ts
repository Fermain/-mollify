import fs from 'fs-extra';
import path from 'path';
import { EntityType } from '../types';

async function moveEntity(entityTypeToMove: EntityType, entityToMove: string, destinationType: EntityType, destinationEntity: string) {
  const sourcePath = entityToMove;
  const destinationPath = path.join(destinationEntity, destinationType, path.basename(sourcePath));
  await fs.move(sourcePath, destinationPath);
  console.log(`Moved ${sourcePath} to ${destinationPath}`);
}

export default moveEntity;
