<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import sendChat from './icons/paper-plane.svg'
  
	export let img: string = sendChat;

	let query: string = "";
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		dispatch('userSubmit', query);
		query = "";
	}
</script>

<div class="bg-slate-300 dark:bg-slate-500 border-t border-slate-400 p-4 drop-shadow-md">
<form on:submit|preventDefault={() => handleSubmit()} 
	class="flex input-group sm:input-group-divider sm:grid-cols-[1fr_auto] rounded">
	<textarea  bind:value={query} 
		class="textarea hidden sm:block bg-slate-200 dark:bg-slate-300 rounded-none p-1"
		placeholder="Write here..." />
	<button type="submit" class="btn variant-filled-primary rounded-none">
		<img src={img} alt="send message" class="h-6 w-6"/>
	</button>
</form></div>
