import { createEntity } from './create';
import { moveEntity } from './move';
import { removeEntity } from './remove';
import { listEntities } from './list';
import slug from './slug';

export default {
  create: createEntity,
  move: moveEntity,
  remove: removeEntity,
  list: listEntities,
  slug
};