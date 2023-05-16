<script lang="ts">
	import { onMount } from 'svelte';
	import ChatMessage from './chatMessage.svelte';
	import MollyIcon from './MollyIcon.svelte';

	export let data: Array<Object>;

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
	<div class="greeting">
		<MollyIcon />
		<span>Hello, what can I do for you?</span>
	</div>
	<div class="messages-feed">
		{#each data as message}
			<ChatMessage {message} />
		{/each}
	</div>
</div>

<style>
	.chat-content {
		flex-grow: 1;
		overflow-y: auto;
	}

	.greeting {
		color: white;
		max-width: 100%;
		margin: 0;
		margin: 5px 0px 5px 0px;
		background-color: #323e47e8;
		cursor: default;
		padding: 10px;
		display: flex;
	}

	span {
		margin-left: 10px;
	}

	.messages-feed {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}
</style>
