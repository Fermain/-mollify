import { prompt } from 'enquirer';
import git from 'simple-git';
import path from 'path';

export async function unregisterSubmodule(destination = '') {
  const gitInstance = git();

  // get the list of existing submodules
  const submoduleStatus = await gitInstance.subModule(['status']);
  const submodules = submoduleStatus
    .split('\n')
    .map((line) => line.trim().split(' ')[1])
    .filter(Boolean);

  const { submodule } = await prompt<{ submodule: string }>({
    type: 'select',
    name: 'submodule',
    message: 'Select the submodule to deregister:',
    choices: submodules,
  });

  try {
    const submodulePath = path.join(destination, submodule);

    // execute the commands with `raw`
    await gitInstance.raw(['submodule', 'deinit', '-f', '--', submodule]);
    await gitInstance.raw(['rm', '-rf', '.git/modules/' + submodule]);
    await gitInstance.raw(['rm', '-rf', submodulePath]);

    console.log(`Successfully removed ${submodule} as a submodule.`);
  } catch (error) {
    console.error(`Error removing submodule: ${error}`);
  }
}
