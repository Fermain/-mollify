import { Command } from 'commander';
import { prompt } from 'enquirer';
import * as path from 'path';
import moveEntity from '../../actions/moveEntity';
import { EntityMeta, EntityType } from '@mollify/types';
import { ENTITY_HIERARCHY } from '../../constants';
import { validParents } from '../../utilities/validParents';
import listEntities from '../../actions/listEntities';
import { log } from 'console';

async function moveEntityPrompt(entityType?: EntityType, entityName?: string) {
  const { entityTypeToMove } = entityType
    ? { entityTypeToMove: entityType }
    : await prompt<{ entityTypeToMove: EntityType }>({
        type: 'select',
        name: 'entityTypeToMove',
        message: 'Select the type of entity you want to move:',
        choices: ENTITY_HIERARCHY.map((entity) => entity.name),
      });

  const choices = await listEntities(entityTypeToMove);

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
    throw new Error('No valid parent types found');
  }

  const validParentEntities = (
    await Promise.all(parentTypes.map((type) => listEntities(type)))
  ).flatMap((entities) => entities);

  if (!validParentEntities.length) {
    throw new Error('No valid parent entities found');
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
  })

  if (await prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: 'Are you sure you want to move this entity?',
    }).then(({ confirm }) => !confirm)) {
      throw new Error('Move cancelled');
  }

  await moveEntity(sourcePath, destinationPath);
}

export default new Command('move')
  .arguments('[entity-type] [entity-name]')
  .description('Move an entity to a new location')
  .action((entityType?: EntityType, entityName?: string) => {
    moveEntityPrompt(entityType, entityName)
      .then(() => console.log('Entity moved'))
      .catch((error) => {
        console.error(`Error moving entity: ${error.message}`);
        process.exit(1);
      });
  });
