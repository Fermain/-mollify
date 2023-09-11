<script lang="ts">
    import { drawerStore } from '@skeletonlabs/skeleton';
	import type { EntityMeta } from '@mollify/types';
	export let entity: EntityMeta;
	let open = false;
    let parent = entity.children.length ? true : false;

    function drawerClose(): void {
        drawerStore.close();
    }
	function toggle() {
		open = !open;
	}
</script>

<nav class="entity">
	<div class="entity-inner">
		<div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
			{#if parent}
				<i class="icon-f">insert_drive_file</i>
			{/if}
			<a href={entity.browserPath} on:click={drawerClose} class="entity-title">
				{entity.title}
			</a>
			{#if entity.children.length}
				<button on:click={toggle} class="btn hover:bg-primary-hover-token p-0"
					><i class="icon-f">{open ? 'expand_less' : 'expand_more'}</i></button
				>
			{/if}
		</div>
		{#if entity.children.length}
			<div class="entity-children" class:open={open}>
				{#each entity.children as child}
					<svelte:self entity={child}/>
				{/each}
			</div>
		{/if}
	</div>
</nav>

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
			padding-left: 1.7rem;

			&:not(.open) {
				display: none;
			}
		}
	}
</style>
