import { Command } from 'commander';
import { prompt } from 'enquirer';
import slugify from 'slugify';
import { EntityType, Entity } from '../../types';
import createEntity from '../../actions/createEntity';

async function createEntityPrompt(entityType: EntityType, destination = '') {
  const title = await prompt<{ title: string }>([
    {
      type: 'input',
      name: 'title',
      message: `What is the name of the ${entityType}?`,
      required: true,
      validate(input) {
        return input.length > 0;
      },
    },
  ]);

  const slug = await prompt<{ slug: string }>([
    {
      type: 'input',
      name: 'slug',
      required: true,
      validate(input) {
        return input.length > 0;
      },
      message: `What is the slug of the ${entityType}?`,
      initial: slugify(title.title, { lower: true, strict: true }),
    },
  ]);

  const entity: Entity = {
    ...title,
    ...slug,
    type: entityType,
  };

  await createEntity(entity, destination);
}

export default new Command('create')
  .arguments('<entity-type> [destination]')
  .description('Create a new entity')
  .action((entityType: EntityType, destination: string) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    createEntityPrompt(entityType, destination)
      .then(() => console.log('Entity created'))
      .catch((error) => {
        console.error(`Error creating entity: ${error.message}`);
        process.exit(1);
      });
  });
