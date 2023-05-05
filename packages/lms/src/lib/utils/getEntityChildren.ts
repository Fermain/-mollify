import fs from 'fs';
import path from 'path';
import type { EntityMeta } from '@mollify/types';
import getEntityMeta from './getEntity';

export default function getEntityChildren(entityPath: string): EntityMeta[] {
  const fullPath = path.resolve(entityPath);

  if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isDirectory()) {
    throw new Error(`Path does not exist or is not a directory: ${fullPath}`);
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
