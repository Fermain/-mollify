import { prompt } from 'enquirer';
import git from 'simple-git';
import path from 'path';

export default async function linkRemoteEntity(destination = '') {
  const { repository } = await prompt<{
    repository: string;
  }>([
    {
      type: 'input',
      name: 'repository',
      message: 'Enter the remote repository URL:',
      validate(input) {
        try {
          return Boolean(new URL(input));
        } catch {
          return "Please enter a valid URL";
        }
      },
    },
  ]);

  try {
    const gitInstance = git();
    await gitInstance.submoduleAdd(
      repository,
      path.join(destination, repository.split('/').pop() || ''),
    );
    console.log(`Successfully added ${repository} as a submodule.`);
  } catch (error) {
    console.error(`Error adding submodule: ${error}`);
  }
}
