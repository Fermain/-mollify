import git from '../../actions/git';
import symlink from '../../actions/symlink';
import yargs from 'yargs';

export default {
  command: 'unlink <mode> <destination>',
  desc: 'Unlink a remote or local entity that was previously linked as a submodule or symlink.',
  builder: (yargs: yargs.Argv) => {
    return yargs
      .positional('mode', {
        describe: 'Mode for the unlinking operation (remote or local)',
        type: 'string',
        demandOption: true,
      })
      .positional('destination', {
        describe: 'Location in this project where the entity is currently linked',
        type: 'string',
        default: process.cwd(),
        demandOption: true,
      });
  },
  handler: async (argv: any) => {
    const mode = argv.mode;
    const destination = argv.destination;

    try {
      switch (mode) {
        case 'remote':
          await git.submodule.unregister(destination);
          break;
        case 'local':
          await symlink.remove(destination);
          break;
        default:
          throw new Error(`Invalid mode: ${mode}. Supported modes are 'remote' and 'local'.`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  },
};