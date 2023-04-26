import path from 'path';
import fs from 'fs-extra';
import type { Entity } from '../types/Entity';
import { ENTITY_FILE } from '../constants';
import { countChildFiles } from '../utilities';
import { prompt } from 'enquirer';

export default async function removeEntity(entity: Entity, basePath = '') {
  const entityDir = path.join(basePath, entity.slug);
  const entityPath = path.resolve(path.join(entityDir, ENTITY_FILE));

  const childFileCount = await countChildFiles(path.resolve(entityDir));

  const { consent } = await prompt<{ consent: boolean }>({
    type: 'confirm',
    initial: false,
    name: 'consent',
    required: true,
    message: `This ${entity.type} has ${childFileCount} child files. Are you sure you want to delete it?`,
  });

  if (!consent) return console.log('Aborted');

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
