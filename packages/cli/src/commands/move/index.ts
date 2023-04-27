import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType } from '../../types';
import listEntities from '../../actions/listEntities';
import moveEntity from '../../actions/moveEntity';

// TODO: abstract filepaths away by allowing users to move from parent to parent
// e.g. move course Example from Programme A to Programme B

async function moveEntityPrompt(
  entityType: EntityType,
  basePath = '',
  initialEntitySlug?: string,
  initialDestination?: string,
) {
  const entities = await listEntities(entityType, basePath);

  const prompts = [
    {
      type: 'autocomplete',
      name: 'entitySlug',
      message: `Which ${entityType} do you want to move?`,
      choices: entities.map((entity) => entity.slug),
      initial: initialEntitySlug
        ? entities.findIndex((entity) => entity.slug === initialEntitySlug)
        : undefined,
      skip: !!initialEntitySlug,
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Enter the destination path:',
      initial: initialDestination,
      skip: !!initialDestination,
      validate: (input: string) => {
        return input.length > 0;
      },
    },
  ];

  const { entitySlug, destination } = await prompt<{
    entitySlug: string;
    destination: string;
  }>(prompts);

  const entity = entities.find((entity) => entity.slug === entitySlug);

  if (!entity) {
    console.error(`Error: Could not find entity with slug "${entitySlug}"`);
    return;
  }

  await moveEntity(entity, destination, basePath);
}

export default new Command('move')
  .arguments('<entity-type> [entity-slug] [destination]')
  .description('Move an entity to a new location')
  .action(
    (entityType: EntityType, entitySlug?: string, destination?: string) => {
      if (!Object.values(EntityType).includes(entityType)) {
        console.error(`Invalid entity type: ${entityType}`);
        process.exit(1);
      }

      moveEntityPrompt(entityType, '', entitySlug, destination)
        .then(() => console.log('Entity moved'))
        .catch((error) => {
          console.error(`Error moving entity: ${error.message}`);
          process.exit(1);
        });
    },
  );
