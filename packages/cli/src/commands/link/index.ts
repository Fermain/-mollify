import git from '../../actions/git';
import symlink from '../../actions/symlink';
import yargs from 'yargs';

export default {
  command: 'link <mode> <destination> <source>',
  desc: 'Link a remote or local entity as a submodule or symlink.',
  builder: (yargs: yargs.Argv) => {
    return yargs
      .positional('mode', {
        describe: 'Mode for the linking operation (remote or local)',
        type: 'string',
        demandOption: true,
      })
      .positional('destination', {
        describe: 'Location in this project where you want to link the entity',
        type: 'string',
        default: process.cwd(),
        demandOption: true,
      })
      .positional('source', {
        describe: 'URL or path for the entity you want to link',
        type: 'string',
        demandOption: true,
      })
  },
  handler: async (argv: any) => {
    const mode = argv.mode;
    const destination = argv.destination;
    const source = argv.source;

    try {
      switch (mode) {
        case 'remote':
          await git.submodule.register(destination, source);
          break;
        case 'local':
          await symlink.create(destination, source);
          break;
        default:
          throw new Error(
            'Invalid mode. Please choose either "remote" or "local".',
          );
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  },
};
