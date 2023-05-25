<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import type { EntityMeta } from '@mollify/types';
	import Card from '$lib/components/cards/Card.svelte';

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
<div class="grid sm:grid-cols-2 gap-4">
	{#if data.length > 0}
		{#each data as result}
			<Card {result} />
		{/each}
	{/if}
</div>
