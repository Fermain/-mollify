import fs from 'fs';
import path from 'path';
import type { EntityMeta } from '@mollify/types';
import { getEntityFrontmatter } from './getEntityFrontmatter';
import { sortChildrenByDependency } from './sortChildrenByDependency';
import getEntitySlug from './getEntitySlug';

/**
 * Used for Nav and Search, it recursively parse markdown files and return an array of objects with arrays of children
 * @param dir  The directory to parse
 * @returns A nested object containing the parsed markdown files
 */
export function getEntityMetaTree(dir: string, content = false) {
  function walkSync(currentDir: string) {
    let currentObject = {} as EntityMeta;
    const children: EntityMeta[] = [];
    // Get the files in the current directory
    const files = fs.readdirSync(currentDir);
    files.forEach((filename) => {
      // Create the full file path check if it is a directory or a markdown file.
      const filePath = path.join(currentDir, filename);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        // Recursively call walkSync with the current directory and the current object
        children.push(walkSync(filePath));
      } else if (path.extname(filename) === '.md') {
        // If the current item is a markdown file, read the file and parse the frontmatter
        const Entity = getEntityFrontmatter(filePath, content);
        const slug = getEntitySlug(filePath);
        // browserPath is the path relative to the browser
        const browserPath = filePath
          .replaceAll('\\', '/')
          .replace('src/routes/content', '/content')
          .replace('+page.md', '');
        currentObject = {
          ...Entity,
          slug,
          address: filePath,
          foldername: path.basename(currentDir),
          browserPath,
          children: []
        };
      }
    });

    if (children.length > 0 || currentObject.type != 'Institution') {
      currentObject.children = sortChildrenByDependency(children);
    }

    return currentObject;
  }

  const institutes = fs.readdirSync(dir);
  const data = institutes.filter(institute => !institute.endsWith('.md')).map((institute) => {
    const instituteDir = path.join(dir, institute);
    return walkSync(instituteDir);
  });

  return data;
}
