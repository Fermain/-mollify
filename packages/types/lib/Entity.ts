export enum EntityType {
  Institution = 'institution',
  Programme = 'programme',
  Course = 'course',
  Module = 'module',
  Lesson = 'lesson',
  Assessment = 'assessment'
}

// Lightweight metadata object for an entity
export interface Entity {
  type: EntityType;
  title: string;
  slug: string;
  tags: Array<string>;
}

// Represents an entity directory on disk
export interface EntityContent extends Entity {
  path: string;
  body: string;
  children: Array<EntityContent>;
}