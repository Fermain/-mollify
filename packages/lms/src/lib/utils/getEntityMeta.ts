import type { EntityMeta } from '@mollify/types';
import getEntityFrontmatter from './getEntityFrontmatter';
import getEntityChildren from './getEntityChildren';
import getEntitySlug from './getEntitySlug';

export default function getEntityMeta(address: string): EntityMeta {
  const slug = getEntitySlug(address);
  const metadata = getEntityFrontmatter(address);
  const children = getEntityChildren(address);

  return { ...metadata, children, address, slug };
}