import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType, Entity } from '../../types';
import removeEntity from '../../actions/removeEntity';
import getEntities from '../../actions/listEntities';

async function entityPrompt(entities: Entity[], message: string) {
  const { index } = await prompt<{ index: number }>({
    type: 'autocomplete',
    name: 'index',
    message,
    choices: entities.map((entity, index) => ({
      name: `${entity.title} (${entity.type})`,
      value: String(index),
    })),
    initial: 0,
  });

  return entities[Number(index)];
}

async function removeEntityPrompt(entityType: EntityType, basePath = '') {
  const entities = await getEntities(entityType, basePath);
  const entity = await entityPrompt(entities, `Which ${entityType} do you want to remove?`);
  await removeEntity(entity, basePath);
}

async function removeEntityFromAll(basePath = '') {
  const allEntities = await Promise.all(
    Object.values(EntityType).map(async (type) => {
      const entities = await getEntities(type, basePath);
      return entities.map((entity) => ({ ...entity, type }));
    }),
  ).then((entityGroups) => entityGroups.flat());

  const entity = await entityPrompt(allEntities, 'Which entity do you want to remove?');
  await removeEntity(entity, basePath);
}

export default new Command('remove')
  .arguments('[entity-type] [basePath]')
  .description('Remove an entity or list all entities')
  .action(async (entityType?: EntityType, basePath?: string) => {
    if (entityType && !Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    if (!entityType) {
      await removeEntityFromAll(basePath);
    } else {
      removeEntityPrompt(entityType, basePath).catch((error) => {
        console.error(`Error removing entity: ${error.message}`);
        process.exit(1);
      });
    }
  });
