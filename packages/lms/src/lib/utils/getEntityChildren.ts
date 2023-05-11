import fs from 'fs';
import path from 'path';
import type { EntityMeta } from '@mollify/types';
import getEntityMeta from './getEntityMeta';

export default function getEntityChildren(entityPath: string): EntityMeta[] {
  let fullPath = path.resolve(entityPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Path does not exist`);
  }

  if (!fs.lstatSync(fullPath).isDirectory()) {
    fullPath = path.dirname(fullPath);
  }

  const childPaths = fs.readdirSync(fullPath);
  const children: EntityMeta[] = [];

  for (const childPath of childPaths) {
    const childFullPath = path.join(fullPath, childPath);

    if (fs.lstatSync(childFullPath).isDirectory()) {
      const childEntity = getEntityMeta(childFullPath);
      children.push(childEntity);
    }
  }

  return children;
}
