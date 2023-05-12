import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType, EntityMeta } from '@mollify/types';
import removeEntity from '../../actions/removeEntity';
import listEntities from '../../actions/listEntities';

async function entityPrompt(entities: EntityMeta[], message: string) {
  const { index } = await prompt<{ index: number }>({
    type: 'autocomplete',
    name: 'index',
    message,
    choices: entities.map((entity, index) => ({
      name: `${entity.title} (${entity.type})`,
      value: String(index),
    })),
    initial: 0
  });

  return entities[Number(index)];
}

async function removeEntityPrompt(entityType?: EntityType, basePath = '') {
  const entities = await listEntities(entityType, basePath);
  const entity = await entityPrompt(entities, entityType ? `Which ${entityType} do you want to remove?` : 'Which entity do you want to remove?');
  await removeEntity(entity);
}

export default new Command('remove')
  .arguments('[entity-type] [basePath]')
  .description('Remove an entity or list all entities')
  .action(async (entityType?: EntityType, basePath?: string) => {    
    if (entityType && !Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    removeEntityPrompt(entityType, basePath).catch((error) => {
      console.error(`Error removing entity: ${error.message}`);
      process.exit(1);
    });
  });
