import yargs from 'yargs';
import { EntityBase, EntityType } from '@mollify/types';
import { table } from 'console';
import entity from '../../actions/entity';
import prompts from '../../prompts';

const createCommand: yargs.CommandModule = {
  command: 'create [location]',
  describe: 'Create a new entity',
  builder: (yargs) =>
    yargs
      .positional('location', {
        describe: 'Location to create the entity',
        type: 'string',
        default: process.cwd(),
      })
      .option('type', {
        alias: 'y',
        describe: 'Type of the entity',
        type: 'string',
        choices: Object.values(EntityType),
      })
      .option('title', {
        alias: 't',
        describe: 'Title of the entity',
        type: 'string',
      })
      .option('tags', {
        alias: 'g',
        describe: 'Tags for the entity',
        type: 'array',
        default: [],
      }),
  handler: async (argv) => {
    const {
      location: locationInput,
      type: typeInput,
      title: titleInput,
      tags: tagsInput,
    } = argv;

    const entitySpec = await prompts.entity.define({
      type: typeInput as EntityType,
      title: titleInput as string,
      tags: tagsInput as string[],
    });

    try {
      table({
        ...entitySpec,
        tags: entitySpec.tags?.join(', '),
      });

      if (!(await prompts.consent())) {
        console.log('Aborting');
        process.exit(0);
      }

      await entity.create(
        entitySpec satisfies EntityBase,
        String(locationInput),
      );

      console.log('Entity created!');
    } catch (error) {
      console.error(`Error creating entity: ${error}`);
      process.exit(1);
    }
  },
};

export default createCommand;
