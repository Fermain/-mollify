import { createEntity } from './create';
import { moveEntity } from './move';
import { removeEntity } from './remove';
import { listEntities } from './list';

export default {
  create: createEntity,
  move: moveEntity,
  remove: removeEntity,
  list: listEntities
};