export enum EntityType {
  Institution = 'institution',
  Programme = 'programme',
  Course = 'course',
  Module = 'module',
  Lesson = 'lesson',
  Assessment = 'assessment'
}

export interface Entity {
	type: EntityType;
	title: string;
	slug: string;
  path?: string;
}