import fs from 'fs-extra';
import path from 'path';

export async function removeSymlink(symlinkPath: string) {
  try {
    const resolvedPath = path.resolve(symlinkPath);

    // check if it's really a symlink
    const stats = await fs.lstat(resolvedPath);

    if (!stats.isSymbolicLink()) {
      throw new Error('Provided path is not a symlink');
    }

    await fs.unlink(resolvedPath);
    console.log(`Symlink at ${resolvedPath} removed successfully`);

  } catch (error) {
    console.error(`Error removing symlink: ${error}`);
  }
}
