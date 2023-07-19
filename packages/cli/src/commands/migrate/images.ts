import yargs from 'yargs';
import markdown from '../../actions/markdown';
import entity from '../../actions/entity';
import path from 'path';
import { log } from 'console';

const migrateImagesCommand: yargs.CommandModule = {
    command: 'migrate images [location]',
    describe: 'Migrate markdown image content files to Mollify structure',
    builder: (yargs) =>
        yargs.positional('location', {
            describe: 'Location to create the entity',
            type: 'string',
            default: process.env.INIT_CWD,
        }).option('archive', {
            alias: 'a',
            describe: 'Archive path for images',
            type: 'string',
            requiresArg: true
        }),
    handler: async (argv) => {
        const { location: locationInput, archive: archiveInput } = argv;

        const entities = await entity.list(undefined, String(locationInput));

        const staticContentPath = path.join(process.cwd(), "static/content");

        for await (const entity of entities) {
            await markdown.migrate.images(entity.address, String(archiveInput), staticContentPath);
        }
    },
};

export default migrateImagesCommand;
