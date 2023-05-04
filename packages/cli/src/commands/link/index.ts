import { Command } from 'commander';
import actions from '../../actions';

export default new Command('link')
  .arguments('<mode> <destination> [targetDir]')
  .description('Link a remote or local entity as a submodule or symlink.')
  .action(async (mode, destination, targetDir = 'src/routes') => {
    try {
      if (!destination) {
        throw new Error(
          'Please provide a URL or path for the entity you want to link.',
        );
      }

      switch (mode) {
        case 'remote':
          await actions.linkRemoteEntity(destination);
          break;
        case 'local':
          await actions.linkLocalEntity(destination, targetDir);
          break;
        default:
          throw new Error(
            'Invalid mode. Please choose either "remote" or "local".',
          );
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
