<script lang="ts">
  import type { EntityMeta } from '@mollify/types';
  import Entity from './Entity.svelte';
  import { page } from '$app/stores';
  import { navRenderParamStore } from '$lib/stores/navRender';

  export let entities: Array<EntityMeta> = [];
  $: _entities = Array.isArray(entities) ? entities : [entities];

  const path = decodeURIComponent($page.url.pathname).toLowerCase() + '/';
  navRenderParamStore.set($page.url.searchParams.get('nav') ?? supplyMissingNavParam(entities));

  let findEntity: EntityMeta | undefined;
  switch ($navRenderParamStore) {
    case 'programme':
    case 'course':
    case 'module':
      entities.find((entity) => findEntityTree(entity, $navRenderParamStore));
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
    let checkPath = path.includes(entity.browserPath?.toLowerCase() ?? '');
    if (!checkPath) return entity.children?.forEach((child) => findEntityTree(child, type));

    let checkType = type ? entity.type?.toLowerCase() === type : true;
    if (checkType && checkPath) return (findEntity = entity);

    entity.children?.forEach((child) => findEntityTree(child, type));
  }

  // if no nav param is present, add the type of the current page to nav param
  function supplyMissingNavParam(entities: EntityMeta[]) {
    let string = '';

    function callback(entity: EntityMeta): unknown {
      const match = path === entity.browserPath?.toLocaleLowerCase();
      return match ? (string = entity.type) : entity.children?.find(callback);
    }
    entities.find(callback);
    return string.toLocaleLowerCase();
  }
</script>

{#each _entities as entity}
  <Entity {entity} />
{/each}
