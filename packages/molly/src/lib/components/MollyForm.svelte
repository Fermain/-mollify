<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// import sendChat from './icons/paper-plane.svg'
  
	// export let img:string = sendChat;

	let query: string = "";
	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('userSubmit', query);
		query = "";
	}

	function handleKeyPress(event:KeyboardEvent) {
		//if statement to prevent empty query to be submitted
		if(query.length === 0 && event.key === 'Enter'){
		event.preventDefault() 
		} else {	
		//enable press Enter submit and Shit+Enter line break
		if(query.length > 0 && event.key === 'Enter' && !event.shiftKey){
			event.preventDefault()
			handleSubmit()
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
			<!-- <button type="submit" class="btn variant-filled-primary rounded-none">
				<img src={img} alt="send message" class="h-6 w-6"/>
			</button> -->
		</div>
</form></div>
