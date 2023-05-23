import git from 'simple-git';
import path from 'path';

export async function registerSubmodule(destination: string, source: string) {
  try {
    const gitInstance = git();
    await gitInstance.submoduleAdd(
      source,
      path.join(destination, source.split('/').pop() || ''),
    );
    console.log(`Successfully added ${source} as a submodule.`);
  } catch (error) {
    console.error(`Error adding submodule: ${error}`);
  }
}
