<script lang="ts">
    import { drawerStore } from '@skeletonlabs/skeleton';
	import type { EntityMeta } from '@mollify/types';
	export let entity: EntityMeta;
	let open = false;
    function drawerClose(): void {
        drawerStore.close();
    }
    let typeOfEntity = entity.type;
    let icon = '';

    if (typeOfEntity === 'Assessment') {
        icon = 'Task'
    } else if (typeOfEntity === 'Lesson') {
        icon = 'Article'
    } else if (typeOfEntity === 'Module') {
        icon = 'Layers'
    } else if (typeOfEntity === 'Course') {
        icon = 'Book'
    } else if (typeOfEntity === 'Programme') {
        icon = 'Folder'
    } else if (typeOfEntity === 'Institution') {
        icon = 'School'
    }

	function toggle() {
		open = !open;
	}
</script>

<nav class="entity">
	<div class="entity-inner">
		<div class="entity-header hover:bg-primary-hover-token rounded-container-token p-2">
            <a href={entity.browserPath} on:click={drawerClose} class="entity-title flex flex-row items-center">
                <i class="icon-f p-2">{icon}</i>
                <p>{entity.title}</p>
			</a>
			{#if entity.children.length}
				<button on:click={toggle} class="btn hover:bg-primary-hover-token p-0">
                    <i class="icon-f">{open ? 'expand_less' : 'expand_more'}</i>
                </button>
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
