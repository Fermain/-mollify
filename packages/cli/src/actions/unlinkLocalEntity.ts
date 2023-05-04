import fs from 'fs-extra';
import path from 'path';

export default async function unlinkLocalEntity(localPath = "", targetDir = 'src/routes') {
  const srcPath = path.resolve(localPath);
  const destPath = path.join(process.cwd(), targetDir, path.basename(localPath));

  if (!fs.existsSync(destPath)) {
    throw new Error(`The symlink does not exist: ${destPath}`);
  }

  if (!fs.lstatSync(destPath).isSymbolicLink()) {
    throw new Error(`The path is not a symlink: ${destPath}`);
  }

  await fs.unlink(destPath);
  console.log(`Successfully removed the symlink at "${destPath}"`);
}
