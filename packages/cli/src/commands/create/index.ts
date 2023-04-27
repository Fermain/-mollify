import { Command } from 'commander';
import { prompt } from 'enquirer';
import slugify from 'slugify';
import { EntityType, Entity } from '../../types';
import createEntity from '../../actions/createEntity';

async function createEntityPrompt(
  entityType?: EntityType,
  destination = '',
  passedTitle?: string,
  passedSlug?: string,
) {
  entityType =
    entityType ??
    (
      await prompt<{ entityType: EntityType }>([
        {
          type: 'select',
          name: 'entityType',
          message: 'Which entity type do you want to create?',
          choices: Object.values(EntityType),
        },
      ])
    ).entityType;

  const title =
    passedTitle ??
    (
      await prompt<{ title: string }>([
        {
          type: 'input',
          name: 'title',
          message: `What is the name of the ${entityType}?`,
          required: true,
          validate(input) {
            return input.length > 0;
          },
        },
      ])
    ).title;

  const slug =
    passedSlug ??
    (
      await prompt<{ slug: string }>([
        {
          type: 'input',
          name: 'slug',
          required: true,
          validate(input) {
            return input.length > 0;
          },
          message: `What is the slug of the ${entityType}?`,
          initial: slugify(title, { lower: true, strict: true }),
        },
      ])
    ).slug;

  const entity: Entity = {
    title,
    slug,
    type: entityType,
  };

  await createEntity(entity, destination);
}

export default new Command('create')
  .arguments('[destination] [title] [slug] [entity-type]')
  .description('Create a new entity')
  .action(
    (
      destination: string,
      title?: string,
      slug?: string,
      entityType?: EntityType,
    ) => {
      createEntityPrompt(entityType, destination, title, slug)
        .then(() => console.log('Entity created'))
        .catch((error) => {
          console.error(`Error creating entity: ${error.message}`);
          process.exit(1);
        });
    },
  );
