import yargs from 'yargs';
import { migrateEntities } from '../../actions/migrateEntity';

const migrateCommand: yargs.CommandModule = {
  command: 'migrate [location]',
  describe: 'Migrate markdown content files to Mollify structure',
  builder: (yargs) =>
    yargs.positional('location', {
      describe: 'Location to create the entity',
      type: 'string',
      default: process.cwd(),
    }),
  handler: async (argv) => {
    const { location: locationInput } = argv;

    await migrateEntities(locationInput as string);
  }
};

export default migrateCommand;