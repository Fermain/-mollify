import { ensureSymlink } from '../../symlink/ensure';
import { ensureContentDir } from './content';
import { ensureIgnoreFile } from './ignore';

export default {
  contentDir: ensureContentDir,
  ignoreFile: ensureIgnoreFile,
  symlink: ensureSymlink,
};
