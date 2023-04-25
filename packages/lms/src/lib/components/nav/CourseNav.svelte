<script lang="ts">
	export let data: Record<string, any> = {};
	export let indent = 0.125;
	const path = '/content/';
	export let currentPath: string;
</script>

<h3 style="padding-left: {indent}rem">
	{data.frontmatter.title}
</h3>
<a href={`${path}${data.frontmatter.path}`} style="padding-left: {indent + 1}rem">Overview</a>
{#each Object.entries(data) as [moduleName, module]}
	{#if moduleName !== 'frontmatter'}
		<h3>{moduleName}</h3>
		{#each Object.entries(module) as [lessonName, lesson]}
			{#if lessonName !== 'frontmatter'}
				<a href={`${path}${lesson.frontmatter.path}`} style="padding-left: {indent + 1}rem"
					>{lessonName}</a
				>
			{:else}
				<a href={`${path}${lesson.path}`} style="padding-left: {indent + 1}rem">Overview</a>
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
		text-decoration: none;
	}
</style>
