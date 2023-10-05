<script lang="ts">
  import type { EntityMeta } from '@mollify/types';
  import Entity from './Entity.svelte';
  import { page } from '$app/stores';
  import { getContext } from 'svelte';

  export let entities: Array<EntityMeta> = [];
  $: _entities = Array.isArray(entities) ? entities : [entities];

  const renderByType = getContext('navRender');
  let findEntity: EntityMeta | undefined;

  switch (renderByType) {
    case 'programme':
    case 'course':
    case 'module':
      entities.find((entity) => findEntityTree(entity, renderByType));
      entities = findEntity ? [findEntity] : entities;
      break;
    case 'disabled':
      entities = [];
    case 'institution':
      break;
    default:
      entities.find((entity) => findEntityTree(entity));
      entities = findEntity ? [findEntity] : entities;
      break;
  }

  function findEntityTree(entity: EntityMeta, type = ''): unknown {
    const path = decodeURIComponent($page.url.pathname).toLowerCase() + '/';

    let checkPath = path.includes(entity.browserPath?.toLowerCase() ?? '');
    if (!checkPath) return entity.children?.forEach((child) => findEntityTree(child, type));

    let checkType = type ? entity.type?.toLowerCase() === type : true;
    if (checkType && checkPath) return (findEntity = entity);

    entity.children?.find((child) => findEntityTree(child, type));
  }
</script>

{#each _entities as entity}
  <Entity {entity} />
{/each}
