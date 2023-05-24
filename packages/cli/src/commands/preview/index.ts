import yargs from 'yargs';
import actions from '../../actions';

const initCommand: yargs.CommandModule = {
  command: 'preview',
  describe: 'Preview your content live in the browser',
  handler: async (argv) => {
    try {
      await actions.preview();
    } catch (error) {
      console.error(`Error previewing project: ${error}`);
      process.exit(1);
    }
  },
};

export default initCommand;
