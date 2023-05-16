<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let query: string | null = null;
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		dispatch('userSubmit', query);
	}
</script>

<form on:submit|preventDefault={() => handleSubmit()}>
	<input type="text" bind:value={query} />
	<button type="submit"> Send </button>
</form>

<style>
	form {
		display: flex;
	}

	input {
		flex: 1;
	}

	
</style>
