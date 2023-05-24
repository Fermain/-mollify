import path from 'path';
import { IGNORE_FILE, IGNORE_TEMPLATE } from '../../../constants';
import fs from 'fs-extra';
import { log } from 'console';

export async function ensureIgnoreFile() {
  const ignoreFile = path.join(process.cwd(), IGNORE_FILE);
  const ignoreTemplate = path.join(__dirname, '..', '..', '..', '..', IGNORE_TEMPLATE);

  // Check if the file exists
  const fileExists = await fs.exists(ignoreFile);
  if (!fileExists) {
    // Copy src/templates/gitignore to .gitignore
    await fs.copyFile(ignoreTemplate, ignoreFile);
  }
}
