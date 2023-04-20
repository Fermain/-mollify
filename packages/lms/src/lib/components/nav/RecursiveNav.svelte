<script lang="ts">
	export let data: Record<string, any> = {};
	export let open = false;
	function toggleOpen() {
		open = !open;
	}
	export let indent = 0;
	export let path = '/content/';
</script>

{#each Object.entries(data) as [name, children]}
	<h3 style="padding-left: {indent}rem" on:click={toggleOpen}>
		{name}
		{open ? '(open)' : '(closed)'}
	</h3>
	{#if open}
		{#each Object.entries(children) as [childName, child]}
			{#if childName === 'description'}
				<a href={`${path}${name}`} style="padding-left: {indent}rem">{child.name}</a>
			{:else if typeof child === 'object'}
				<svelte:self data={{ [childName]: child }} indent={indent + 1} path={`${path}${name}/`} />
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
		font-size: 1.5rem;
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
