import { prompt } from 'enquirer';
import git from 'simple-git';

export default async function unlinkRemoteEntity(submoduleName = '') {
  const { submodulePath } = await prompt<{
    submodulePath: string;
  }>([
    {
      type: 'input',
      name: 'submodulePath',
      message: 'Enter the submodule path to unlink:',
      validate(input) {
        return input.length > 0;
      },
    },
  ]);

  try {
    const gitInstance = git();

    // Deinitialize the submodule
    await gitInstance.raw(['submodule', 'deinit', '-f', submodulePath]);

    // Remove the submodule
    await gitInstance.rm(['-f', submodulePath]);

    console.log(`Successfully unlinked the ${submoduleName} submodule.`);
  } catch (error) {
    console.error(`Error unlinking submodule: ${error}`);
  }
}
