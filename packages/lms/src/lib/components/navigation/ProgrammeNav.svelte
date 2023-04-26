<script lang="ts">
	export let data: Record<string, any> = {};
	export let currentPath: string;
	const path = '/content/';
</script>

<div>
	<h3>
		{data?.frontmatter?.title}
	</h3>
	<a href={`${path}${data.frontmatter.path}`}>Overview</a>
	{#each Object.entries(data) as [moduleName, module]}
		{#if moduleName !== 'frontmatter'}
			<h3>{moduleName}</h3>
			{#each Object.entries(module) as [lessonName, lesson]}
				{#if lessonName !== 'frontmatter'}
					<a href={`${path}${lesson.frontmatter.path}`}>{lessonName}</a>
				{:else}
					<a href={`${path}${lesson.path}`}>Overview</a>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<!-- <script lang="ts">
	export let data: Record<string, any> = {};
</script>

<main>
	<slot />

	<h2>
		{data.frontmatter?.title}
		{data.frontmatter?.type === 'Institute' ? 'Programmes' : 'Courses'}
	</h2>
	<div class="inst-grid">
		{#each Object.entries(data) as [institute, instituteData]}
			{#if institute !== 'frontmatter'}
				<div class="card">
					{#if instituteData.frontmatter}
						<h3>{instituteData.frontmatter.title}</h3>
						<img src={instituteData.frontmatter.url} alt={instituteData.frontmatter.title} />
						<p>{instituteData.frontmatter.summary}</p>
						<a href={`/content/${instituteData.frontmatter.path}`}>View Details</a>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.card {
		max-width: 300px;
		margin: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 1rem;
	}

	.card img {
		width: 100%;
	}

	.card a {
		display: block;
		text-align: center;
		margin-top: 1rem;
		padding: 0.5rem;
		background-color: #661f86;
		border-radius: 0.5rem;
		text-decoration: none;
		color: white;
		font-size: 1.25rem;
	}

	.inst-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style> -->
