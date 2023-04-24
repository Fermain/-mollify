<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';

	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		const data = await response.json();
		files.set(data);
	});
</script>

<header><a href="/">home</a></header>
<slot />

<style>
	:global(body) {
		margin: 0;
	}

	header {
		background-color: black;
		color: white;
		padding: 0.5rem;
	}

	a {
		color: white;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
