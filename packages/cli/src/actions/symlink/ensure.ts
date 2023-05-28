import path from 'path';
import fs from 'fs-extra';
import { PACKAGE_INVENTORY, SYMLINK_DIR } from '../../constants';
import { log } from 'console';
const [LMS] = PACKAGE_INVENTORY;

export async function ensureSymlink(
  origin = path.join(process.cwd(), SYMLINK_DIR),
  destination = path.join(process.cwd(), 'node_modules', LMS, 'src/routes'),
) {
  try {
    log(`Ensuring symlink from ${origin} to ${destination}`)
    await fs.ensureSymlink(origin, destination);
  } catch (error: any) {
    log(`Error ensuring symlink: ${error}`);
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}
