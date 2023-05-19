import yargs from 'yargs';
import { prompt } from 'enquirer';
import createEntity from '../../actions/createEntity';
import { EntityBase, EntityType } from '@mollify/types';
import { table } from 'console';

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

    const entitySpec: EntityBase = {
      type: typeInput as EntityType,
      title: titleInput as string,
      tags: tagsInput as string[],
    };

    if (!typeInput) {
      const { type } = await prompt<{ type: EntityType }>({
        type: 'select',
        name: 'type',
        message: 'Select the type of entity you want to create:',
        choices: Object.keys(EntityType),
      });
      entitySpec.type = type;
    }

    if (!titleInput) {
      const { title } = await prompt<{ title: string }>({
        type: 'input',
        name: 'title',
        message: 'What is the name of the entity?',
      });
      entitySpec.title = title;
    }

    try {
      table(entitySpec);

      if (
        (await prompt<{ confirm: boolean }>({
          type: 'confirm',
          name: 'confirm',
          message: 'Does this look correct?',
          initial: true,
        }).then(({ confirm }) => !confirm))
      ) {
        console.log('Aborting');
        process.exit(0);
      }

      await createEntity(
        entitySpec satisfies EntityBase,
        String(locationInput),
      );
    } catch (error) {
      console.error(`Error creating entity: ${error}`);
      process.exit(1);
    }
  },
};

export default createCommand;
