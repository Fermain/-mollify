import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import type { EntityType } from '../types/Entity';
import { ENTITY_FILE } from '../constants';

export default async function migrateEntity(originPath: string, entityType: EntityType, name: string) {
  const parentDir = path.dirname(originPath);
  const subDir = path.join(parentDir, name);
  const destinationPath = path.resolve(path.join(subDir, ENTITY_FILE));
  const slug = parentDir.split(path.sep).pop() || '';

  const doc = await fs.readFile(originPath, 'utf8');
    const { content, data } = matter(doc);

    const frontmatter = {
      ...data,
      type: entityType,
      slug
    };

    await fs.ensureDir(subDir);
    await fs.writeFile(destinationPath, matter.stringify(content, frontmatter), 'utf8');
    await fs.unlink(originPath);
}
