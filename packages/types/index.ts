// Enumeration of entity types
export enum EntityType {
    Institution = "Institution",
    Programme = "Programme",
    Course = "Course",
    Module = "Module",
    Lesson = "Lesson",
    Assessment = "Assessment",
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
    content?: string;
    hidden?: boolean;
    [key: string]: unknown;
}

// Extended interface for entity metadata, including slug, children, and address
// These represent dynamic values that must come from disk
export interface EntityMeta extends EntityBase {
    slug: string;
    browserPath?: string;
    children?: Array<EntityMeta>;
    address: string;
}
