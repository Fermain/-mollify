<script lang="ts">
	import { onMount } from 'svelte';

	export let markdownUrl: string = '/api/fetchRemote';

	let markdownContent = '';

	onMount(async () => {
		const response = await fetch(markdownUrl);
		const data = await response.text();
		markdownContent = data;
	});
</script>

<main>
	{@html markdownContent}
</main>
