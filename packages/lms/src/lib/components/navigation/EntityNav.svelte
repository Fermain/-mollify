<script lang="ts">
	import type { EntityMeta } from '@mollify/types';
	import Entity from './Entity.svelte';

	export let entities: Array<EntityMeta> | EntityMeta = [];
	$: _entities = Array.isArray(entities) ? entities : [entities];
</script>

{#each _entities as entity}
	<Entity entity={entity} />
{/each}