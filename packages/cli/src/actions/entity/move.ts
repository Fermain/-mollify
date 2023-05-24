import fs from 'fs-extra';
import path from 'path';

export async function moveEntity(entityToMove: string, destinationEntity: string) {
  const sourcePath = entityToMove;
  const destinationPath = path.join(destinationEntity, path.basename(sourcePath));
  await fs.move(sourcePath, destinationPath);
  console.log(`Moved ${sourcePath} to ${destinationPath}`);
}
