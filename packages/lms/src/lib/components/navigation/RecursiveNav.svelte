<script lang="ts">
	import { slide } from 'svelte/transition';
	export let data: Record<string, any> = {};
	let open = null;

	function toggleOpen(title) {
		open = open === title ? null : this.title;
	}

	export let indent = 0.125;
	let currentPath: string;

	console.log('data: ', data);
</script>

{#each data as { title, browserPath, children }}
	<h3 style="padding-left: {indent}rem" on:click={toggleOpen(title)} key={title}>
		{title}
	</h3>
	{#if open === title}
		<div transition:slide={{ duration: 300 }}>
			<a href={browserPath} style="padding-left: {indent}rem">Overview</a>
			{#each children as child}
				{#if child.children.length === 0 || child.children === undefined}
					<a
						href={child.browserPath}
						class:current={child.browserPath === currentPath}
						style="padding-left: {indent + 0.125}rem"
					>
						{child.title}
					</a>
				{:else}
					<svelte:self data={child} indent={indent + 0.125} />
				{/if}
			{/each}
		</div>
	{/if}
{/each}

<style>
	h3 {
		font-weight: 600rem;
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: 0.25rem;
		display: block;
		border: 1px solid var(--primary);
		margin: 0;
		font-size: 1.25rem;
		cursor: pointer;
	}
	a {
		font-size: 1.2rem;
		font-weight: 600rem;
		color: var(--text-primary);
		background-color: var(--secondary);
		text-decoration: none;
		padding: 0.25rem;
		display: block;
		border: 1px solid gray;
	}

	.current {
		text-decoration: underline;
	}
</style>
