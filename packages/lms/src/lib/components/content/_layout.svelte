<script>
	import { onMount } from 'svelte';
	export let title;
	export let tags;
	onMount(() => {
		console.log('title', title);
		console.log('tags', tags);
	});
</script>

<slot />
