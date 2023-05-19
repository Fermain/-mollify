<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let data: Record<string, any> = {};
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="summary">{data.title}</svelte:fragment>
		<div slot="content">
			<div class="hover:bg-primary-hover-token rounded-container-token">
				<a href={`${data.browserPath}`} class="flex p-2">Overview</a>
			</div>
			{#each data.children as module}
				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="summary">{module.title}</svelte:fragment>
						<div slot="content">
							<div class="hover:bg-primary-hover-token rounded-container-token">
								<a href={module.browserPath} class="flex p-2"> Overview </a>
							</div>
							{#each module.children as lesson}
								<div class="hover:bg-primary-hover-token rounded-container-token">
									<a href={lesson.browserPath} class="flex p-2">
										{lesson.title}
									</a>
								</div>
							{/each}
						</div>
					</AccordionItem>
				</Accordion>
			{/each}
		</div>
	</AccordionItem>
</Accordion>
