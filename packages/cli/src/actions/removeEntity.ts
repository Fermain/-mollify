import path from 'path';
import fs from 'fs-extra';
import type { Entity } from '../types/Entity';
import { ENTITY_FILE } from '../constants';
import { countFiles } from '../utilities';
import { prompt } from 'enquirer';

async function confirmDeletion(entityType: string, fileCount: number) {
  const message = fileCount > 1 ? `In total ${fileCount} files will be removed. ` : '' + `Are you sure you want to remove this ${entityType}?`;

  const { consent } = await prompt<{ consent: boolean }>({
    type: 'confirm',
    name: 'consent',
    required: true,
    message,
  });

  return consent;
}

export default async function removeEntity(entity: Entity, basePath = '') {
  const entityDir = path.join(basePath, entity.slug);
  const entityPath = path.resolve(path.join(entityDir, ENTITY_FILE));

  const fileCount = await countFiles(path.resolve(entityDir));

  if (!(await confirmDeletion(entity.type, fileCount))) return;

  try {
    await fs.remove(entityDir);
    console.log(
      `Successfully removed ${entity.type} and its child entities at ${entityPath}`,
    );
  } catch (error) {
    console.error(
      `Error removing ${entity.type} and its child entities at ${entityPath}:`,
      error,
    );
  }
}
