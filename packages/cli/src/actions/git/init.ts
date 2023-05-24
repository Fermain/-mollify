import git from 'simple-git';

export async function gitInit(directory = process.cwd()) {
  try {
    const simpleGit = git(directory);
    await simpleGit.init();
    console.log("Git repository initialized successfully in", directory);
  } catch (error: any) {
    console.error("An error occurred while initializing the git repository:", error);
  }
}
