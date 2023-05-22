import entity from "./entity";
import git from "./git";
import markdown from "./markdown";
import symlink from "./symlink";
import { initialiseProject } from "./init";

export default {
  init: initialiseProject,
  entity,
  git,
  markdown,
  symlink,
};