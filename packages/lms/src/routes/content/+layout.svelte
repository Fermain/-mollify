<script>
	import { onMount } from 'svelte';

	let subjects = {};

	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		subjects = await response.json();
	});
</script>

<nav>
	<ul>
		{#each Object.entries(subjects) as [subject, courses]}
			<li>
				<h3>{subject}</h3>
				<ul>
					{#each Object.entries(courses) as [course, modules]}
						<li>
							<h4>{course}</h4>
							<ul>
								{#each Object.entries(modules) as [module, lessons]}
									<li>
										<h5>{module}</h5>
										<ul>
											{#each lessons as lesson}
												<li>
													<a href={`/${subject}/${course}/${module}/${lesson.slug}`}
														>{lesson.title}</a
													>
												</li>
											{/each}
										</ul>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</nav>
<slot />
