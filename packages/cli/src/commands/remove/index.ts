import { EntityType } from '@mollify/types';
import actions from '../../actions';
import yargs from 'yargs';
import prompts from '../../prompts';

async function removeEntityPrompt(entityType?: EntityType, basePath = '') {
  const entities = await actions.entity.list(entityType, basePath);
  const entity = await prompts.entity.select(
    entities,
    entityType
      ? `Which ${entityType} do you want to remove?`
      : 'Which entity do you want to remove?',
  );
  await actions.entity.remove(entity);
}

export default {
  command: 'remove [entity-type] [basePath]',
  desc: 'Remove an entity or list all entities',
  builder: (yargs: yargs.Argv) => {
    return yargs
      .positional('entity-type', {
        describe: 'Type of the entity to remove',
        type: 'string',
      })
      .positional('basePath', {
        describe: 'Base path for the operation',
        type: 'string',
        default: process.cwd(),
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
      await removeEntityPrompt(entityType, basePath);
    } catch (error) {
      console.error(`Error removing entity: ${error}`);
      process.exit(1);
    }
  },
};
