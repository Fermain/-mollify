import path from 'path';

export default function getEntitySlug(entityPath: string): string {
  const fullPath = path.resolve(entityPath);
  const pageFileName = '+page.md';
  const contentPath = path.join(fullPath, pageFileName);

  if (!fullPath.endsWith(pageFileName)) {
    throw new Error(`Entity file does not have the expected file name: ${contentPath}`);
  }

  const entityFolder = path.dirname(fullPath);
  const slug = path.basename(entityFolder);

  return slug;
}
