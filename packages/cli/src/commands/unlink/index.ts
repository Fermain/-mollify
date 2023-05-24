import { Command } from 'commander';
import actions from '../../actions';

export default new Command('unlink')
  .arguments('<mode> [destination]')
  .description(
    'Unlink a remote or local entity that was previously linked as a submodule or symlink.',
  )
  .action(async (mode, destination) => {
    try {
      switch (mode) {
        case 'remote':
          await actions.git.submodule.unregister(destination);
          break;
        case 'local':
          await actions.symlink.remove(destination);
          break;
        default:
          console.error(
            `Invalid mode: ${mode}. Supported modes are 'remote' and 'local'.`,
          );
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
