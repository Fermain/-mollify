<script>
	import { onMount } from 'svelte';

	let subjects = {};

	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		subjects = await response.json();
	});

	// const currentPath = window.location.pathname;
	// console.log('Current path:', currentPath);
</script>

<nav>
	{#each Object.entries(subjects) as [subject, courses]}
		<h2>{subject}</h2>
		{#each Object.entries(courses) as [course, modules]}
			<h3>{course}</h3>
			<ul>
				{#each Object.entries(modules) as [module, lessons]}
					<li>
						<h4>{module}</h4>
						<ul>
							{#each lessons as lesson}
								<li>
									<a href={`/content/${subject}/${course}/${module}`}>{lesson.name}</a>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		{/each}
	{/each}
</nav>
<slot />

<style>
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	h4 {
		margin: 0;
	}
</style>
