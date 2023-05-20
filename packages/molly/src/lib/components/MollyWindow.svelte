
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

	<div class="container-header">
		<div class="assistant-molly">
			<Logo/>
			<h4>Ask Molly</h4>
		</div>
		<button on:click={onClick} class="btn variant-filled-primary"><img src={img} alt="close chat"></button>
	</div>
	

<style>
	.container-header {
		display: flex; 
		justify-content: space-between;
		align-content: center;
		background-color: #323d47;
		margin: 0px;
		padding: 10px;
		height: 50px;
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



	img {
		padding: 0;
		width: 30px;
		height: 30px;
	}
</style>