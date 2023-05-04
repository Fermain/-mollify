import createEntity from './createEntity';
import listEntities from './listEntities';
import listMarkdown from './listMarkdown';
import moveEntity from './moveEntity';
import removeEntity from './removeEntity';
import updateEntity from './updateEntity';
import { migrateEntity, migrateEntities } from './migrateEntity';
import linkLocalEntity from './linkLocalEntity';
import linkRemoteEntity from './linkRemoteEntity';

export default {
  createEntity,
  listEntities,
  listMarkdown,
  moveEntity,
  removeEntity,
  updateEntity,
  migrateEntity,
  migrateEntities,
  linkLocalEntity,
  linkRemoteEntity
};
