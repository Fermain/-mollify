<script lang="ts">
	import type { EntityMeta } from '@mollify/types';
	import { readable, writable } from 'svelte/store';

	export let entities: Array<EntityMeta> | EntityMeta = [];
	$: _entities = Array.isArray(entities) ? entities : [entities];

	// Use Svelte writable store for the "open" state
	let openStates = writable({}); // Initialize as a writable store

	function toggle(entityId: string) {
		openStates.update((states) => {
			states[entityId] = !states[entityId];
			return { ...states };
		});
	}
</script>

{#each _entities as entity}
	<nav
		class="entity"
		tabindex="0"
		on:keydown={(event) => {
			if (event.key === 'Enter' || event.key === 'Space') {
				toggle(entity.id);
			}
		}}
	>
		<div class="entity-inner">
			<div
				class="entity-header hover:bg-primary-hover-token rounded-container-token p-2"
				on:click={() => toggle(entity.id)}
			>
				<a href={entity.browserPath} class="entity-title">
					{entity.title}
				</a>
				{#if entity.children.length}
					<button class="btn hover:bg-primary-hover-token p-0">
						<i class="icon-f">{openStates[entity.id] ? 'expand_less' : 'expand_more'}</i>
					</button>
				{/if}
			</div>
			{#if entity.children.length}
				<div class="entity-children" class:open={$openStates[entity.id]}>
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
			cursor: pointer; /* Add cursor pointer to indicate clickable element */
		}

		&-title {
			flex: 1;
			padding: 0.5rem 0;
			padding-left: 0.5rem;
		}

		&-children {
			padding-left: 0.5rem;

			&:not(.open) {
				display: none;
			}
		}
	}
</style>
