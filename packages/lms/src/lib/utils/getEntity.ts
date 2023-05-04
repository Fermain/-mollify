import type { EntityMeta } from '@mollify/types';
import getEntityFrontmatter from './getEntityFrontmatter';
import getEntityChildren from './getEntityChildren';
import getEntitySlug from './getEntitySlug';

export default function getEntityMeta(entityPath: string): EntityMeta {
  const slug = getEntitySlug(entityPath);
  const metadata = getEntityFrontmatter(entityPath);
  const children = getEntityChildren(entityPath);

  return { ...metadata, children, address: entityPath, slug };
}