import { EntityType, EntityMeta } from '@mollify/types';
import entity from '../../actions/entity';
import yargs from 'yargs';

async function listEntities(entityType?: EntityType, basePath = '') {
  const entities: EntityMeta[] = await entity.list(entityType, basePath);

  if (entities.length === 0) {
    console.log(`No entities found.`);
  } else {
    console.log(`Entities:`);
    entities.forEach((entity) => {
      console.log(`- ${entity.title} (${entity.type}) (${entity.address})`);
    });
  }
}

export default {
  command: 'list [entity-type] [basePath]',
  desc: 'List all entities of a given type or all entities',
  builder: (yargs: yargs.Argv) => {
    return yargs
      .positional('entity-type', {
        describe: 'Type of the entities to list',
        type: 'string',
      })
      .positional('basePath', {
        describe: 'Base path for the operation',
        type: 'string',
      });
  },
  handler: async (argv: any) => {
    const entityType = argv['entity-type'] as EntityType | undefined;
    const basePath = argv['basePath'] as string | undefined;
    if (entityType && !Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    try {
      await listEntities(entityType, basePath);
    } catch (error) {
      console.error(`Error listing entities: ${error}`);
      process.exit(1);
    }
  },
};
