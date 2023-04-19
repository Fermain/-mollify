import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType } from '../../types';
import getEntities from '../../actions/listEntities';
import moveEntity from '../../actions/moveEntity';

async function moveEntityPrompt(entityType: EntityType, basePath = '') {
  const entities = await getEntities(entityType, basePath);

  const { entitySlug, destination } = await prompt<{
    entitySlug: string;
    destination: string;
  }>([
    {
      type: 'autocomplete',
      name: 'entitySlug',
      message: `Which ${entityType} do you want to move?`,
      choices: entities.map((entity) => entity.slug),
      initial: 0,
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Enter the destination path:',
      validate(input) {
        return input.length > 0;
      },
    },
  ]);

  const entity = entities.find((entity) => entity.slug === entitySlug);

  if (entity) {
    await moveEntity(entity, destination, basePath);
  } else {
    console.error(`Error: Could not find entity with slug "${entitySlug}"`);
  }
}

export default new Command('move')
  .arguments('<entity-type>')
  .description('Move an entity to a new location')
  .action((entityType: EntityType) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    moveEntityPrompt(entityType)
      .then(() => console.log('Entity moved'))
      .catch((error) => {
        console.error(`Error moving entity: ${error.message}`);
        process.exit(1);
      });
  });
