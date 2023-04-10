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
	name: string;
	slug: string;
}