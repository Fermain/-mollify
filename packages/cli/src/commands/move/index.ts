import yargs from 'yargs';
import * as path from 'path';
import { EntityType } from '@mollify/types';
import { validParents } from '../../utilities/validParents';
import entity from '../../actions/entity';
import prompts from '../../prompts';
import {
  PROMPT_ENTITY_MOVE,
  PROMPT_ENTITY_MOVE_TO,
  PROMPT_ENTITY_TYPE_MOVE,
} from '../../localisation';

const moveCommand: yargs.CommandModule = {
  command: 'move [entity-type]',
  describe: 'Move an entity to a new location',
  builder: (yargs) =>
    yargs.positional('entity-type', {
      describe: 'Type of the entity',
      type: 'string',
    }),
  handler: async (argv) => {
    const entityType = argv['entity-type'] as EntityType | undefined;

    try {
      await moveEntityPrompt(entityType);
      console.log('Entity moved');
    } catch (error) {
      console.error(`Error moving entity: ${(error as Error).message}`);
      process.exit(1);
    }
  },
};

async function moveEntityPrompt(entityType?: EntityType) {
  const all = await entity.list();
  const typeChoices = [...new Set(all.map((entity) => entity.type))];

  const entityTypeToMove =
    entityType ||
    (await prompts.entity.type.select(typeChoices, PROMPT_ENTITY_TYPE_MOVE));

  const choices = all.filter((entity) => entity.type === entityTypeToMove);

  const entityToMove = await prompts.entity.select(choices, PROMPT_ENTITY_MOVE);

  const sourcePath = path.dirname(entityToMove.address);

  const parentTypes = validParents(entityTypeToMove);

  if (!parentTypes || !parentTypes.length) {
    throw new Error(
      'This is a root level entity (or the entity type is misconfigured)',
    );
  }

  const validParentEntities = all.filter((entity) =>
    parentTypes.includes(entity.type as EntityType),
  );

  if (!validParentEntities.length) {
    throw new Error('There is no valid location to move this entity.');
  }

  const newParentEntity = await prompts.entity.select(
    validParentEntities,
    PROMPT_ENTITY_MOVE_TO,
  );

  const destinationPath = path.dirname(newParentEntity.address);

  console.table({
    source: sourcePath,
    destination: destinationPath,
  });

  if (await prompts.consent()) {
    throw new Error('Move cancelled');
  }

  await entity.move(sourcePath, destinationPath);
}

export default moveCommand;
