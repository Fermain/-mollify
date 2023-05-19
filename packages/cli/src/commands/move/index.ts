import yargs from 'yargs';
import { prompt } from 'enquirer';
import * as path from 'path';
import moveEntity from '../../actions/moveEntity';
import { EntityType } from '@mollify/types';
import { validParents } from '../../utilities/validParents';
import listEntities from '../../actions/listEntities';

const moveCommand: yargs.CommandModule = {
  command: 'move [entity-type] [entity-name]',
  describe: 'Move an entity to a new location',
  builder: (yargs) =>
    yargs
      .positional('entity-type', {
        describe: 'Type of the entity',
        type: 'string',
      })
      .positional('entity-name', {
        describe: 'Name of the entity',
        type: 'string',
      }),
  handler: async (argv) => {
    const entityType = argv['entity-type'] as EntityType | undefined;
    const entityName = argv['entity-name'] as string | undefined;

    try {
      await moveEntityPrompt(entityType, entityName);
      console.log('Entity moved');
    } catch (error) {
      console.error(`Error moving entity: ${(error as Error).message}`);
      process.exit(1);
    }
  },
};

async function moveEntityPrompt(entityType?: EntityType, entityName?: string) {
  const all = await listEntities();
  const typeChoices = [...new Set(all.map((entity) => entity.type))];

  const { entityTypeToMove } = entityType
    ? { entityTypeToMove: entityType }
    : await prompt<{ entityTypeToMove: EntityType }>({
        type: 'select',
        name: 'entityTypeToMove',
        message: 'Select the type of entity you want to move:',
        choices: typeChoices,
      });

  const choices = all.filter((entity) => entity.type === entityTypeToMove);

  const { entityToMove } = entityName
    ? { entityToMove: entityName }
    : await prompt<{ entityToMove: string }>({
        type: 'select',
        name: 'entityToMove',
        message: 'Select the entity to move:',
        choices: choices.map((entity) => entity.address),
      });

  const sourcePath = path.dirname(entityToMove);

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

  const { newParentEntity } = await prompt<{ newParentEntity: string }>({
    type: 'select',
    name: 'newParentEntity',
    message: 'Select the destination entity:',
    choices: validParentEntities.map((entity) => entity.address),
  });

  const destinationPath = path.dirname(newParentEntity);

  console.table({
    source: sourcePath,
    destination: destinationPath,
  });

  if (
    await prompt<{ confirm: boolean }>({
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to move this entity?',
      initial: true,
    }).then(({ confirm }) => !confirm)
  ) {
    throw new Error('Move cancelled');
  }

  await moveEntity(sourcePath, destinationPath);
}

export default moveCommand;
