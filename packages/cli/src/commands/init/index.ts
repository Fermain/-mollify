import yargs from 'yargs';
import { initialiseProject } from '../../actions/init';

const initCommand: yargs.CommandModule = {
  command: 'init',
  describe: 'Initialise a new project',
  handler: async (argv) => {
    try {
      await initialiseProject();
    } catch (error) {
      console.error(`Error initialising project: ${error}`);
      process.exit(1);
    }
  },
};

export default initCommand;
