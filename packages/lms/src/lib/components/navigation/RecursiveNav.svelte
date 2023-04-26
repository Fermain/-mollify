<script lang="ts">
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
		{#each Object.entries(children) as [childName, child]}
			{#if childName === 'frontmatter' && Object.keys(children).length === 1}
				<a href={`${path}${name}`} style="padding-left: {indent}rem">{child.name}</a>
			{:else if childName === 'frontmatter'}
				<a href={`${path}${name}`} style="padding-left: {indent + 1.5}rem">{child.name}</a>
			{:else if typeof child === 'object'}
				{#if Object.values(child).every((value) => typeof value !== 'object')}
					<a href={`${path}${name}/${childName}`} style="padding-left: {indent + 1}rem"
						>{childName}</a
					>
				{:else}
					<svelte:self data={{ [childName]: child }} indent={indent + 1} path={`${path}${name}/`} />
				{/if}
			{/if}
		{/each}
	{/if}
{/each}

<style>
	h3 {
		font-weight: 600rem;
		background-color: rgb(182, 181, 181);
		padding: 0.25rem;
		display: block;
		border: 1px solid black;
		margin: 0;
		font-size: 1.25rem;
		cursor: pointer;
	}
	a {
		font-size: 1.2rem;
		font-weight: 600rem;
		color: white;
		background-color: black;
		padding: 0.25rem;
		display: block;
		border: 1px solid gray;
	}
</style>
