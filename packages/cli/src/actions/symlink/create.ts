import fs from 'fs-extra';
import path from 'path';

export async function createSymlink(localPath = "", targetDir = 'src/routes') {
  const srcPath = path.resolve(localPath);
  const destPath = path.join(process.cwd(), targetDir, path.basename(localPath));

  if (!fs.existsSync(srcPath)) {
    throw new Error(`The provided path does not exist: ${localPath}`);
  }

  await fs.ensureSymlink(srcPath, destPath);
  console.log(`Successfully created a symlink from "${srcPath}" to "${destPath}"`);
}
