<script lang="ts">
	import { slide } from 'svelte/transition';
	export let data: Record<string, any> = {};
	export let indent = 0.125;
	const path = '/content/';
	export let currentPath: string;
	let open: string | null = null;

	function toggleOpen(title: string): void {
		open = open === title ? null : title;
	}

	function handleKeydown(event: KeyboardEvent, title: string): void {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleOpen(title);
		}
	}
</script>

<div>
	<h3 style="padding-left: {indent}rem">
		{data.title}
	</h3>
	<a
		href={`${data.browserPath}`}
		style="padding-left: {indent + 1}rem"
		class={currentPath === data.foldername ? 'current' : ''}>Overview</a
	>
	{#each data.children as module}
		<h3
			on:click={() => toggleOpen(module.title)}
			on:keydown={(event) => handleKeydown(event, module.title)}
			tabindex="0"
		>
			{module.title}
		</h3>
		{#if open === module.title}
			<div transition:slide={{ duration: 300 }}>
				<a
					href={module.browserPath}
					style="padding-left: {indent + 1}rem"
					class={currentPath === module.foldername ? 'current' : ''}>Overview</a
				>
				{#each module.children as lesson}
					<a
						href={lesson.browserPath}
						style="padding-left: {indent + 2}rem"
						class={currentPath === lesson.foldername ? 'current' : ''}>{lesson.title}</a
					>
				{/each}
			</div>
		{/if}
	{/each}
</div>

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
