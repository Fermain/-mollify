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

<div class="bg-primary-500/30 p-4">
<form on:submit|preventDefault={() => handleSubmit()} 
	class="input-group input-group-divider grid-cols-[1fr_auto] 
	rounded-container-token">
	<textarea  bind:value={query} class="bg-transparent border-0 ring-0"/>
	<button type="submit" class="variant-filled-primary"><img src={img} alt="send message"/></button>
</form></div>

<style lang="scss">
	img {
		width: 20px;
		height: 20px;
	}
</style>

<!--
<style>

form {
		background-color: #323d47;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	textarea {
		max-width: 70%;
		min-width: 70%;
		max-height: 100px;
		border-radius: 5px;
		padding: 5px;
		resize: none; /*prevents the user from manually resizing the field*/
	}

	button {
		padding: 10px;
		width: 50px;
		border: none;
		border-radius: 10px;
		background-color: #21a299;
		color: white;
		cursor: pointer;
	}

	img {
		width: 20px;
		height: 20px;
	}
	
</style>
-->
