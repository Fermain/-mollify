<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { EntityMeta } from '@mollify/types';

	export let data = [] as EntityMeta[];
</script>

<Accordion>
	{#each data as { title, browserPath, children }}
		<AccordionItem>
			<svelte:fragment slot="summary">{title}</svelte:fragment>
			<div slot="content">
				<div class="hover:bg-primary-hover-token rounded-container-token">
					<a href={browserPath} class="flex p-2">Overview</a>
				</div>
				{#each children as child}
					{#if (child.type === 'lesson' && child.children.length === 0) || child.children === undefined}
						<div class="hover:bg-primary-hover-token rounded-container-token">
							<a href={child.browserPath} class="flex p-2">
								{child.title}
							</a>
						</div>
					{:else}
						<svelte:self data={[child]} />
					{/if}
				{/each}
			</div>
		</AccordionItem>
	{/each}
</Accordion>
