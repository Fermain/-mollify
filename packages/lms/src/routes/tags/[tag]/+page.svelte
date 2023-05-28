<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import type { EntityMeta } from '@mollify/types';

	let data: EntityMeta[] = [];
	onMount(async () => {
		const tag = $page.params.tag;
		const tagFiles = await fetch(`/api/tags`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tag })
		});
		data = await tagFiles.json();
	});
</script>

<h1>Content Results Including Tag: {$page.params.tag}</h1>
<div class="results-container">
	{#if data.length > 0}
		{#each data as result}
			<div class="result">
				<h3>{result.title}</h3>
				<p>Type: {result.type}</p>
				<p>Tags: {result.tags}</p>
				<a class="result-btn" href={result.browserPath}>View Details</a>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.result {
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: var(--spacing-m);
		border-radius: var(--spacing-m);
	}

	.results-container {
		padding: 0.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 1rem;
	}

	.result-btn {
		background-color: var(--secondary);
		color: var(--text-primary);
		margin: auto;
		display: block;
		padding: var(--spacing-s) var(--spacing-m);
		border-radius: var(--spacing-s);
		align-self: center;
		margin: auto;
		width: fit-content;
		text-decoration: none;
	}

	.result-btn:hover {
		background-color: var(--text-primary);
		color: var(--secondary);
	}
</style>
