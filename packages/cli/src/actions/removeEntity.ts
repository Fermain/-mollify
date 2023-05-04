import path from 'path';
import fs from 'fs-extra';
import type { EntityMeta } from '@mollify/types';
import { countFiles } from '../utilities';
import { prompt } from 'enquirer';
import { table } from 'console';

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

export default async function removeEntity(entity: EntityMeta) {
  const entityPath = path.dirname(entity.address);

  table(entity);

  const fileCount = await countFiles(path.resolve(entityPath));

  if (!(await confirmDeletion(entity.type, fileCount))) return;

  try {
    await fs.remove(entity.address);
    console.log(
      `Successfully removed ${entity.type}${fileCount > 1 ? ' and its child entities' : ''} at ${entityPath}`,
    );
  } catch (error) {
    console.error(
      `Error removing ${entity.type} at ${entityPath}:`,
      error,
    );
  }
}
