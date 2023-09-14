<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let query: string = "";
	const dispatch = createEventDispatcher();

	function handleKeyPress(event:KeyboardEvent) {
		//if statement to prevent empty query to be submitted
		if(query.length === 0 && event.key === 'Enter'){
		event.preventDefault() 
		} else {	
		//enable press Enter submit and Shit+Enter line break
		if(query.length > 0 && event.key === 'Enter' && !event.shiftKey){
			event.preventDefault()
			dispatch('userSubmit', query);
			query = "";
		}}
}

</script>

<div class="bg-surface-100-800-token border-t border-slate-400 p-4 drop-shadow-md">
	<form >
	<label for="userText">Ask Molly</label>
		<div class="flex input-group sm:input-group-divider sm:grid-cols-[1fr_auto] rounded">
			<textarea bind:value={query}
			class="textarea bg-slate-100 dark:bg-slate-200 rounded-none p-1 text-black"
			placeholder="Your Query"
			id="userText"
			on:keypress={(event) => handleKeyPress(event)} />
		</div>
</form></div>
