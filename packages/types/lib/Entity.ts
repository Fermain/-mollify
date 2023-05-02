import path from 'path';

// Note: this is a stub implementation
function getChildrenSync(path: string) {
  console.log(`getChildrenSync(${path}) not implemented.`);
  return new Array<Entity>()
}

export enum EntityType {
  Institution = 'institution',
  Programme = 'programme',
  Course = 'course',
  Module = 'module',
  Lesson = 'lesson',
  Assessment = 'assessment'
}

// Lightweight metadata object for an entity
export interface EntityBase {
  type: EntityType;
  title: string;
  tags: Array<string>;
  previous?: string;
}

export interface EntityMeta extends EntityBase {
  slug: string;
  children: Array<EntityMeta>;
  address: string;
}

export class Entity implements EntityMeta {
  public slug: string;
  public children = new Array<EntityMeta>();

  constructor(
    public address: string,
    public type: EntityType,
    public title: string,
    public tags: Array<string>,
    public previous?: string,
  ) {
    // Slug truth comes from the disk path
    this.slug = path.dirname(address);

    // Entity child truth comes from the disk path
    this.children = getChildrenSync(address);
  }
}