<script lang="ts">
	export let data: Record<string, any> = {};
	export let indent = 0.125;
	const path = '/content/';
	export let currentPath: string;
</script>

<div>
	<h3 style="padding-left: {indent}rem">
		{data.title}
	</h3>
	<a
		href={`${data.browserPath}`}
		style="padding-left: {indent + 1}rem"
		class={currentPath === data.title ? 'current' : ''}>Overview</a
	>
	{#each data.children as module}
		<h3>{module.title}</h3>
		<a
			href={module.browserPath}
			style="padding-left: {indent + 1}rem"
			class={currentPath === module.title ? 'current' : ''}>Overview</a
		>
		{#each module.children as lesson}
			<a
				href={lesson.browserPath}
				style="padding-left: {indent + 2}rem"
				class={currentPath === lesson.title ? 'current' : ''}>{lesson.title}</a
			>
		{/each}
	{/each}
</div>

<style>
	h3 {
		font-weight: 600rem;
		background-color: var(--primary);
		color: var(--text-secondary);
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
		background-color: var(--secondary);
		color: var(--text-primary);
		padding: 0.25rem;
		display: block;
		border: 1px solid gray;
		text-decoration: none;
	}

	.current {
		text-decoration: underline;
	}
</style>
