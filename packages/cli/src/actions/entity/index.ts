import { createEntity } from './create';
import { moveEntity } from './move';
import { removeEntity } from './remove';
import { listEntities } from './list';
import slug from './slug';
import { getEntityChildren, populateEntityChildren } from './children';
import { parseEntity } from './parse';
import { getEntity, getEntityBySlug } from './get';

export default {
  create: createEntity,
  move: moveEntity,
  remove: removeEntity,
  list: listEntities,
  get: getEntity,
  getBySlug: getEntityBySlug,
  slug,
  children: {
    get: getEntityChildren,
    populate: populateEntityChildren
  },
  parse: parseEntity
};