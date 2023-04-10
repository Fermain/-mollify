import fs from 'fs-extra';

export async function ensureSymlink(srcRoutesPath: string, symlinkPath: string) {
  try {
    await fs.ensureDir(srcRoutesPath);
  } catch (error) {
    console.error(`Error ensuring directory at ${srcRoutesPath}: ${error}`);
    return;
  }

  try {
    await fs.ensureSymlink(srcRoutesPath, symlinkPath, 'junction');
    console.log('Symlink created successfully.');
  } catch (error) {
    console.error(`Error creating symlink from ${srcRoutesPath} to ${symlinkPath}: ${error}`);
  }
}

export async function hasSymlink(symlinkPath: string): Promise<boolean> {
  try {
    const symlinkExists = await fs.pathExists(symlinkPath);
    if (!symlinkExists) {
      return false;
    }

    const symlinkStats = await fs.lstat(symlinkPath);
    if (!symlinkStats.isSymbolicLink()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error checking symlink at ${symlinkPath}: ${error}`);
    return false;
  }
}

export async function removeSymlink(symlinkPath: string) {
  try {
    await fs.remove(symlinkPath);
    console.log('Symlink removed successfully.');
  } catch (error) {
    console.error(`Error removing symlink at ${symlinkPath}: ${error}`);
  }
}
