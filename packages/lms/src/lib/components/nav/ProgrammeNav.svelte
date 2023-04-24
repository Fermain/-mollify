<script lang="ts">
	export let data: Record<string, any> = {};
</script>

<main>
	<slot />

	<h2>{data.description?.title} {data.description?.type}s</h2>
	<div class="inst-grid">
		{#each Object.entries(data) as [institute, instituteData]}
			{#if institute !== 'description'}
				<div class="card">
					{#if instituteData.description}
						<h3>{instituteData.description.title}</h3>
						<img src={instituteData.description.url} alt={instituteData.description.title} />
						<p>{instituteData.description.summary}</p>
						<a href={`/content/${instituteData.description.path}`}>View Details</a>
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
</style>
