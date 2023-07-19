import { getEntityMetaTree } from '$lib/utils/getEntityMetaTree';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
  return {
    sitemap: getEntityMetaTree('src/routes/content')
  };
};
