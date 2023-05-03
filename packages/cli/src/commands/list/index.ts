import { Command } from 'commander';
import { EntityType, EntityMeta } from '@mollify/types';
import getEntities from '../../actions/listEntities';

async function listEntities(entityType?: EntityType, basePath = '') {
  const entities: EntityMeta[] = await getEntities(entityType, basePath);

  if (entities.length === 0) {
    console.log(`No entities found.`);
  } else {
    console.log(`Entities:`);
    entities.forEach((entity) => {
      console.log(`- ${entity.title} (${entity.type}) (${entity.address})`);
    });
  }
}

export default new Command('list')
  .arguments('[entity-type] [basePath]')
  .description('List all entities of a given type or all entities')
  .action((basePath: string, entityType?: EntityType) => {
    if (entityType && !Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    listEntities(entityType, basePath).catch((error) => {
      console.error(`Error listing entities: ${error.message}`);
      process.exit(1);
    });
  });
