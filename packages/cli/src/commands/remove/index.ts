import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType, Entity } from '../../types';
import removeEntity from '../../actions/removeEntity';
import getEntities from '../../actions/listEntities';

async function removeEntityPrompt(entityType: EntityType, basePath = '') {
  const entities = await getEntities(entityType, basePath);

  const entity: Entity = {
    ...(await prompt<Entity>([
      {
        type: 'autocomplete',
        name: 'slug',
        message: `Which ${entityType} do you want to remove?`,
        choices: entities.map((entity) => entity.slug),
        initial: 0,
      },
    ])),
    type: entityType,
  };

  await removeEntity(entity, basePath);
}

export default new Command('remove')
  .arguments('<entity-type> [basePath]')
  .description('Remove an entity')
  .action((entityType: EntityType, basePath: string) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    removeEntityPrompt(entityType, basePath)
      .catch((error) => {
        console.error(`Error removing entity: ${error.message}`);
        process.exit(1);
      });
  });
