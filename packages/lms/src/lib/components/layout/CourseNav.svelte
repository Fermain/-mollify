<script lang="ts">
	import { onMount } from 'svelte';

	let subjects = {};

	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		subjects = await response.json();
	});

	// const currentPath = window.location.pathname;
	// const paths = currentPath.split('/');

	// console.log('Current path:', currentPath, 'Paths:', paths.length);
	let expandedCourse: string | null = null;
</script>

<main>
	<div>
		<nav>
			{#each Object.entries(subjects) as [subject, courses]}
				<h2>{subject}</h2>
				{#each Object.entries(courses) as [course, modules]}
					<h3 on:click={() => (expandedCourse = expandedCourse === course ? null : course)}>
						{course}
					</h3>
					{#if expandedCourse === course}
						<ul>
							{#each Object.entries(modules) as [module, lessons]}
								<li>
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
					{/if}
				{/each}
			{/each}
		</nav>
		<section>
			<slot />
		</section>
	</div>
</main>

<style>
	@media (min-width: 768px) {
		div {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}

	ul {
		padding: 0;
		margin: 0;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 600rem;
		background-color: gray;
		padding: 0.25rem;
		display: block;
		border: 1px solid black;
		margin: 0;
		cursor: pointer;
	}
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li a {
		font-size: 1.2rem;
		font-weight: 600rem;
		color: white;
		background-color: black;
		padding: 0.25rem;
		display: block;
		border: 1px solid gray;
	}
</style>
