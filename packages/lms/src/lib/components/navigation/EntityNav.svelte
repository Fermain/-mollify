<script lang="ts">
	import type { EntityMeta } from '@mollify/types';

	export let entities: Array<EntityMeta> | EntityMeta = [];
	$: _entities = Array.isArray(entities) ? entities : [entities];

	function toggle(entity) {
		entity.open = !entity.open;
	}
</script>

{#each _entities as entity}
	<nav class="entity">
		<div class="entity-inner">
			<div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
				<a href={entity.browserPath} class="entity-title" on:click={() => entity.open = false}>
					{entity.title}
				</a>
				{#if entity.children.length}
					<button on:click={() => toggle(entity)} class="btn hover:bg-primary-hover-token p-0">
						<i class="icon-f">{entity.open ? 'expand_less' : 'expand_more'}</i>
					</button>
				{/if}
			</div>
			{#if entity.children.length}
				<div class="entity-children" class:open={entity.open}>
					{#each entity.children as child}
						<svelte:self entities={child} />
					{/each}
				</div>
			{/if}
		</div>
	</nav>
{/each}

<style lang="scss">
	.entity {
		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&-title {
			flex: 1;
			padding: 0.5rem 0;
			padding-left: 0.5rem;
		}

		&-children {
			padding-left: 0.5rem;
			display: none;

			&.open {
				display: block;
			}
		}
	}
</style>

