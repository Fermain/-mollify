import { Command } from 'commander';
import { prompt } from 'enquirer';
import * as path from 'path';
import moveEntity from '../../actions/moveEntity';
import { EntityType } from '../../types';
import { ENTITY_HIERARCHY } from '../../constants';

async function moveEntityPrompt(entityType?: EntityType, entityName?: string) {
  const { entityTypeToMove } = entityType
    ? { entityTypeToMove: entityType }
    : await prompt<{ entityTypeToMove: EntityType }>({
        type: 'select',
        name: 'entityTypeToMove',
        message: 'Select the type of entity you want to move:',
        choices: ENTITY_HIERARCHY.map((entity) => entity.name),
      });

  const entityTypeHierarchy = ENTITY_HIERARCHY.find(
    (entity) => entity.name === entityTypeToMove,
  );
  const { entityToMove } = entityName
    ? { entityToMove: entityName }
    : await prompt<{ entityToMove: string }>({
        type: 'select',
        name: 'entityToMove',
        message: 'Select the entity to move:',
        choices: entityTypeHierarchy
          ? entityTypeHierarchy.children.map((entity) => path.dirname(entity))
          : [],
      });

  const destinationTypeHierarchy = ENTITY_HIERARCHY.find(
    (entity) => entity.name !== entityTypeToMove,
  );
  const destinationType = destinationTypeHierarchy?.name;

  const { destinationEntity } = await prompt<{ destinationEntity: string }>({
    type: 'select',
    name: 'destinationEntity',
    message: 'Select the destination entity:',
    choices: destinationTypeHierarchy
      ? destinationTypeHierarchy.children.map((entity) => path.dirname(entity))
      : [],
  });

  if (destinationType && destinationEntity) {
    await moveEntity(
      entityTypeToMove,
      entityToMove,
      destinationType,
      destinationEntity,
    );
  } else {
    console.error('Error moving entity: Invalid destination');
    process.exit(1);
  }
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
