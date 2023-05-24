import path from 'path';
import fs from 'fs-extra';
import { PACKAGE_INVENTORY, SYMLINK_DIR } from '../../constants';
const [LMS] = PACKAGE_INVENTORY;

export async function ensureSymlink(
  origin = path.join(process.cwd(), SYMLINK_DIR),
  destination = path.join(process.cwd(), 'node_modules', LMS, 'src/routes'),
) {
  try {
    await fs.ensureSymlink(origin, destination);
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}
