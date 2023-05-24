import fs from 'fs/promises';

export async function countFiles(folderPath: string): Promise<number> {
  try {
    const files = await fs.readdir(folderPath);
    const visibleFiles = files.filter(file => !file.startsWith('.'));
    return visibleFiles.length;
  } catch (error) {
    console.error(`Error counting child files in folder ${folderPath}:`, error);
    return 0;
  }
}