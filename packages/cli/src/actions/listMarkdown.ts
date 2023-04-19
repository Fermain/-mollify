import glob from 'glob';
import path from 'path';
import { ENTITY_FILE } from '../constants';

export default async function listMarkdown(basePath = ''): Promise<string[]> {
  const pattern = path.join(basePath, '*', '*.md');
  const excludePattern = path.join(basePath, '*', ENTITY_FILE);
  return glob.sync(pattern).filter(file => !file.endsWith(excludePattern));
}
