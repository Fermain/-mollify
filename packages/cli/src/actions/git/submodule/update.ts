import git from 'simple-git';

const repo = git();

export async function updateSubmodules() {
  await repo.subModule(['update', '--init', '--recursive']);
}