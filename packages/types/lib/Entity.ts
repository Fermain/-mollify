import path from "path";

// Stub implementation for retrieving child entities from disk
function getChildrenSync(path: string) {
  console.log(`getChildrenSync(${path}) not implemented.`);
  return new Array<Entity>();
}

// Stub implementation for retrieving entity metadata from disk
function getEntityMetaSync(path: string): EntityMeta {
  console.log(`getEntityMetaSync(${path}) not implemented.`);
  return {
    type: EntityType.Course,
    title: "Test Course",
    tags: new Array<string>(),
    slug: "test-course",
    children: [],
    address: path,
  };
}

// Enumeration of entity types
export enum EntityType {
  Institution = "institution",
  Programme = "programme",
  Course = "course",
  Module = "module",
  Lesson = "lesson",
  Assessment = "assessment",
}

// Base interface for entity metadata
export interface EntityBase {
  type: EntityType;
  title: string;
  tags: Array<string>;
  previous?: string;
}

// Extended interface for entity metadata, including slug, children, and address
export interface EntityMeta extends EntityBase {
  slug: string;
  children: Array<EntityMeta>;
  address: string;
}

/**
 * Entity class - represents a single content file with all additional metadata
 * @example
 * const testCourse = new Entity('content/courses/test-course');
 */
export class Entity implements EntityMeta {
  public readonly slug: string;
  public readonly children = new Array<EntityMeta>();
  public readonly type: EntityType;
  public readonly title: string;
  public readonly tags = new Array<string>();
  public readonly previous?: string;

  constructor(public readonly address: string) {
    // Assign the slug based on the directory name from the given address
    this.slug = path.dirname(address);

    // Retrieve entity metadata from disk
    const { type, title, tags, previous } = getEntityMetaSync(address);
    this.type = type;
    this.title = title;
    this.tags = tags;
    this.previous = previous;

    // Retrieve child entities from disk
    this.children = getChildrenSync(address);
  }
}
