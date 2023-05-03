import { Command } from 'commander';
import { linkEntity } from '../../actions/linkEntity';

export function register(program: Command) {
  program
    .command('link')
    .description('Add a remote repository as a git submodule in the root directory')
    .action(async () => {
      try {
        await linkEntity();
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    });
}
