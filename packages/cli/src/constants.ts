import { EntityType } from './types';

export const SYMLINK_DIR = 'content';
export const ENTITY_FILE = '+page.md';
export const INDEX_FILE = 'index.md';

export const ENTITY_HIERARCHY = [
  {
    name: EntityType.Institution,
    children: [EntityType.Programme],
  },
  {
    name: EntityType.Programme,
    children: [EntityType.Course],
  },
  {
    name: EntityType.Course,
    children: [EntityType.Module, EntityType.Assessment],
  },
  {
    name: EntityType.Module,
    children: [EntityType.Lesson, EntityType.Assessment],
  },
  {
    name: EntityType.Lesson,
    children: [EntityType.Assessment],
  },
  {
    name: EntityType.Assessment,
    children: [],
  },
];
