import fs from 'fs/promises';

export async function countChildFiles(folderPath: string): Promise<number> {
  try {
    const files = await fs.readdir(folderPath);
    const visibleFiles = files.filter(file => !file.startsWith('.'));
    return visibleFiles.length - 1;
  } catch (error) {
    console.error(`Error counting child files in folder ${folderPath}:`, error);
    return 0;
  }
}