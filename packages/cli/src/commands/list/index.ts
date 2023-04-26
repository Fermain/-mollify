import { Command } from 'commander';
import { EntityType, Entity } from '../../types';
import getEntities from '../../actions/listEntities';

async function listEntities(entityType: EntityType, basePath = '') {
  const entities: Entity[] = await getEntities(entityType, basePath);
  if (entities.length === 0) {
    console.log(`No ${entityType}s found.`);
  } else {
    console.log(`${entityType}s:`);
    entities.forEach((entity) => {
      console.log(`- ${entity.title} (${entity.path})`);
    });
  }
}

export default new Command('list')
  .arguments('<entity-type> [basePath]')
  .description('List all entities of a given type')
  .action((entityType: EntityType, basePath: string) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    listEntities(entityType, basePath)
      .catch((error) => {
        console.error(`Error listing entities: ${error.message}`);
        process.exit(1);
      });
  });
