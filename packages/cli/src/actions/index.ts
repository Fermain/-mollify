import entity from './entity';
import git from './git';
import markdown from './markdown';
import symlink from './symlink';
import { initialiseProject } from './init';
import { previewProject } from './preview';

export default {
  init: initialiseProject,
  preview: previewProject,
  entity,
  git,
  markdown,
  symlink,
};
