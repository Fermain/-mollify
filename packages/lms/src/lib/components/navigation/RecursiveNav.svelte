<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { EntityMeta } from '@mollify/types';

	export let data = [] as EntityMeta[];
	let open: string | null = null;

	function toggleOpen(title: string): void {
		open = open === title ? null : title;
	}

	function handleKeydown(event: KeyboardEvent, title: string): void {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleOpen(title);
		}
	}

	export let indent = 0.125;
	export let currentPath: string;
</script>

{#each data as { title, browserPath, children, foldername }}
	<h3
		style="padding-left: {indent}rem"
		on:click={() => toggleOpen(title)}
		on:keydown={(event) => handleKeydown(event, title)}
		id={title}
		tabindex="0"
	>
		{title}
	</h3>
	{#if open === title}
		<div transition:slide={{ duration: 300 }}>
			<a
				href={browserPath}
				style="padding-left: {indent}rem"
				class={currentPath === foldername ? 'current' : ''}>Overview</a
			>
			{#each children as child}
				{#if (child.type === 'lesson' && child.children.length === 0) || child.children === undefined}
					<a
						href={child.browserPath}
						style="padding-left: {indent + 0.125}rem"
						class={currentPath === child.foldername ? 'current' : ''}
					>
						{child.title}
					</a>
				{:else}
					<svelte:self data={[child]} indent={indent + 0.125} {currentPath} />
				{/if}
			{/each}
		</div>
	{/if}
{/each}

<style>
	h3 {
		font-weight: 500;
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: var(--spacing-xxs);
		display: block;
		border: 1px solid var(--primary);
		margin: 0;
		font-size: 1.125rem;
		cursor: pointer;
		border: 1px solid var(--secondary);
	}
	a {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		background-color: var(--secondary);
		text-decoration: none;
		padding: var(--spacing-xxs);
		display: block;
		border: 1px solid var(--primary);
	}

	.current {
		text-decoration: underline;
	}
</style>
