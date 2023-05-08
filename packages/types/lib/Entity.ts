import path from "path";

// Stub implementation for retrieving child entities from disk
function getChildrenSync(path: string) {
  console.log(`getChildrenSync(${path}) not implemented.`);
  return new Array<EntityMeta>();
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
// This is the fundamental information contained in frontmatter
export interface EntityBase {
  type: EntityType;
  title: string;
  url?: string;
  summary?: string;
  tags: Array<string>;
  previous?: string;
  [key: string]: unknown;
}

// Extended interface for entity metadata, including slug, children, and address
// These represent dynamic values that must come from disk
export interface EntityMeta extends EntityBase {
  slug: string;
  browserPath?: string;
  children: Array<EntityMeta>;
  address: string;
}

/**
 * Entity class - represents a single content file with all additional metadata
 * @example
 * const testCourse = new Entity('content/courses/test-course');
 */
export class Entity implements EntityMeta {
  public readonly title: string;
  public readonly slug: string;
  public readonly type: EntityType;
  public readonly tags = new Array<string>();
  public readonly previous?: string;
  private _children?: Array<EntityMeta>;
  readonly [key: string]: unknown;

  constructor(public readonly address: string) {
    // Assign the slug based on the directory name from the given address
    this.slug = path.dirname(address);

    // Retrieve entity metadata from disk
    const { type, title, tags, previous, ...dynamic } = getEntityMetaSync(address);
    this.type = type;
    this.title = title;
    this.tags = tags;
    this.previous = previous;
    Object.assign(this, dynamic);
  }

  public get children(): Array<EntityMeta> {
    // Retrieve child entities from disk if not already cached
    return this._children || (this._children = getChildrenSync(this.address));
  }
}
