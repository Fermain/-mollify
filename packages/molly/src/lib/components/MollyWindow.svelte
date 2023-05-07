
<script lang="ts">
	import { onMount } from 'svelte';
  import MollyHeader from './MollyWindowHead.svelte'

	let chatWindow: HTMLElement | null;

	onMount(() => {
		//Scroll to the bottom of the chat window
		
		if (chatWindow) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
		}
	});

	//Watch for changes in the messages array and scroll to the bottom of the chat window
	$: {
		
		if (chatWindow) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
		}
	}
</script>

<div bind:this={chatWindow} class="chat-content">
 <MollyHeader/>
</div>

<style>
  .chat-content {
    height: 200px;
    overflow-y: auto;
    color: white;
		max-width: 300px;
		margin: 0;
		background-color: #323e47e8;
		cursor: default;
		padding: 10px;
		display: flex;
  }
</style>