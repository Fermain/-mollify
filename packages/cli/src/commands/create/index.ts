import { Command } from 'commander';
import { prompt } from 'enquirer';
import { createEntityFiles } from '../../utilities';
import { EntityType, Entity } from '../../types';
import slugify from 'slugify';

async function createEntity(entityType: EntityType, destination = '') {
  const entity: Entity = {
    ...(await prompt<Entity>([
      {
        type: 'input',
        name: 'name',
        message: `What is the name of the ${entityType}?`,
        validate(input) {
          return input.length > 0;
        },
      },
      {
        type: 'input',
        name: 'slug',
        message: `What is the slug of the ${entityType}?`,
        initial: ({ name }: { name: string }) =>
          slugify(name, { lower: true, strict: true }),
      },
    ])),
    type: entityType,
  };

  await createEntityFiles(entity, destination);
}

const entityCommand = new Command('create')
  .arguments('<entity-type> [destination]')
  .description('Create a new entity')
  .action((entityType: EntityType, destination: string) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    createEntity(entityType, destination)
      .then(() => console.log('Entity created'))
      .catch((error) => {
        console.error(`Error creating entity: ${error.message}`);
        process.exit(1);
      });
  });

export default entityCommand;
