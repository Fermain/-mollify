<script lang="ts">
	import { slide } from 'svelte/transition';
	export let data: Record<string, any> = {};
	export let open = false;

	function toggleOpen() {
		open = !open;
	}

	export let indent = 0.125;
	export let path: string;
	export let currentPath: string;
</script>

{#each Object.entries(data) as [name, children]}
	<h3 style="padding-left: {indent}rem" on:click={toggleOpen}>
		{name}
	</h3>
	{#if open}
		<div transition:slide={{ duration: 300 }}>
			{#each Object.entries(children) as [childName, child]}
				{#if childName === 'frontmatter' && Object.keys(children).length === 1}
					<a href={`${path}${child.title}`} style="padding-left: {indent}rem">Overview</a>
				{:else if childName === 'frontmatter'}
					<a href={`${path}${child.title}`} style="padding-left: {indent + 1.5}rem">{child.title}</a
					>
				{:else if typeof child === 'object'}
					{#if Object.entries(child).length === 1 && child.frontmatter}
						<a href={`${path}${child.title}/${childName}`} style="padding-left: {indent + 1}rem"
							>{childName}</a
						>
					{:else}
						<svelte:self
							data={{ [childName]: child }}
							indent={indent + 1}
							path={`${path}${name}/`}
						/>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
{/each}

<style>
	h3 {
		font-weight: 600rem;
		background-color: var(--primary);
		color: white;
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
		color: black;
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
