
<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './MollyIcon.svelte';
	import closeButton from './icons/angle-small-down.svg'
	let img: string = closeButton;

	export let isOpen = false;

	function onClick() {
		isOpen = !isOpen;
	}


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
	<div class="container-header">
		<div class="assistant-molly">
			<Logo/>
			<h4>Ask Molly</h4>
		</div>
		<button on:click={onClick}><img src={img} alt="close chat"></button>
	</div>
	
	
 <slot></slot>
</div>

<style>
  .chat-content {
		position: fixed;
		bottom: 0;
		right: 0;
    height: 400px;
    width: 300px;
		overflow-y: auto;
		margin: 0;
		background-color: #d9d9d9;
		display: flex;
		flex-direction: column;
		align-content: space-between;
  }

	.container-header {
		display: flex; 
		justify-content: space-between;
		align-content: center;
		background-color: #323d47;
		margin: 0px;
		padding: 10px;
	}

	.assistant-molly{
		display: flex;
		flex-direction: row;
		align-self: flex-start;
	}

	h4 {
		color: white;
		margin: 10px 0px 0px 10px;
		cursor: default;
	}

	button {
		background-color: #21A299;
		border-radius: 10px;
		width: 50px;
		border: none;
		color: white; 
		cursor: pointer;
		}

	img {
		padding: 0;
		width: 30px;
		height: 30px;
	}
</style>