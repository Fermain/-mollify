import fs from 'fs-extra';

export async function cloneDir(source: string, destination: string) {
  try {
    await fs.copy(source, destination);
    console.log(`Directory cloned successfully from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Error cloning directory from ${source} to ${destination}: ${error}`);
  }
}