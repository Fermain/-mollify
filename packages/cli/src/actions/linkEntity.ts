import { prompt } from 'enquirer';
import git from 'simple-git';

interface LinkEntityAnswers {
  remoteRepo: string;
}

export async function linkEntity() {
  const userInput = await prompt<LinkEntityAnswers>([
    {
      type: 'input',
      name: 'remoteRepo',
      message: 'Enter the remote repository URL:',
      validate(input) {
        return input.length > 0;
      },
    },
  ]);

  try {
    const gitInstance = git();
    await gitInstance.submoduleAdd(userInput.remoteRepo, userInput.remoteRepo.split('/').pop() || '');
    console.log(`Successfully added ${userInput.remoteRepo} as a submodule.`);
  } catch (error) {
    console.error(`Error adding submodule: ${error}`);
  }
}
