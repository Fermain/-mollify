import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';
import type { LayoutServerLoad } from './$types';
import path from 'path';

export const load: LayoutServerLoad = ({ url }) => {

  try {
    const navPath = path.join('src/routes', path.join(...url.pathname.split('/').splice(1, 3)))
    const sitemap = getEntityMetaTree(navPath);
    return { sitemap };
  } catch {
    return {
      sitemap: []
    }
  }
};
