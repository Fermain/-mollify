import { SYMLINK_DIR } from '../../../constants';
import fs from 'fs-extra';
import path from 'path';

export async function ensureContentDir() {
  const contentDir = path.join(process.cwd(), SYMLINK_DIR);
  let requiresUserInteraction = false;
  // Check if the directory exists
  const dirExists = await fs.pathExists(contentDir);
  if (!dirExists) {
    // User interaction is required to setup the first entity
    requiresUserInteraction = true;
  }

  return { requiresUserInteraction }
}
