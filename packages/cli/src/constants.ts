import { EntityType } from '@mollify/types';

export const SYMLINK_DIR = 'content';
export const ENTITY_FILE = '+page.md';
export const INDEX_FILE = 'index.md';
export const IGNORE_FILE = '.gitignore';
export const IGNORE_TEMPLATE = '/src/templates/gitignore';

export const ENTITY_HIERARCHY = [
  {
    name: EntityType.Institution,
    children: [EntityType.Programme],
  },
  {
    name: EntityType.Programme,
    children: [EntityType.Course],
    parents: [EntityType.Institution],
  },
  {
    name: EntityType.Course,
    children: [EntityType.Module, EntityType.Assessment],
    parents: [EntityType.Programme],
  },
  {
    name: EntityType.Module,
    children: [EntityType.Lesson, EntityType.Assessment],
    parents: [EntityType.Course],
  },
  {
    name: EntityType.Lesson,
    children: [EntityType.Assessment],
    parents: [EntityType.Module],
  },
  {
    name: EntityType.Assessment,
    children: [],
    parents: [EntityType.Course, EntityType.Module, EntityType.Lesson],
  },
];

export const ROOT_ENTITIES = [EntityType.Institution, EntityType.Programme, EntityType.Course];

export const PACKAGE_INVENTORY = ['@mollify/lms', '@mollify/cli', '@mollify/molly', '@mollify/flow', '@mollify/docs', '@mollify/types'];