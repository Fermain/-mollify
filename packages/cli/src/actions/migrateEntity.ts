import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import type { EntityType } from '../types/Entity';
import { ENTITY_FILE } from '../constants';

export default async function migrateEntity(originPath: string, entityType: EntityType, name: string) {
  const parentDir = path.dirname(originPath)
  const destinationPath = path.join(parentDir, ENTITY_FILE);
  const slug = parentDir.split(path.sep).pop() || '';

  try {
    const doc = await fs.readFile(originPath, 'utf8');
    const { content, data } = matter(doc);

    const frontmatter = {
      ...data,
      type: entityType,
      slug
    };

    await fs.writeFile(destinationPath, matter.stringify(content, frontmatter), 'utf8');
    await fs.unlink(originPath);

    console.log(`Successfully migrated ${entityType} from ${originPath} to ${destinationPath}`);
  } catch (error) {
    console.error(`Error migrating ${entityType} from ${originPath} to ${destinationPath}:`, error);
  }
}