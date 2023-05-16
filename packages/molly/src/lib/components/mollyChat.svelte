<script lang="ts">
	import Logo from './components/chatLogo.svelte';
	import AskMolly from './components/chatHeading.svelte';
	import ChatInput from './components/chatInput.svelte';
	import ChatFeed from './components/chatFeed.svelte';
	import ChatButton from './components/chatButton.svelte';
	import ChatBubble from './components/chatBubble.svelte';

	export let expanded: boolean = false;

	let messages: Array<Object> = [];

	function handleChatInputMessage(event: CustomEvent<Message>) {
		// Add the message payload to the messages array
		messages = [...messages, event.detail];
	}
</script>

<!--This is the "chat-bubble" or the "molly-bubble"-->
<ChatBubble expandButton={() => (expanded = !expanded)} />

<!--This is the div that displays the chat window
  
  this is located down in the right side of the page when the chat bubble is pressed-->

{#if expanded}
	<div class="container">
		<div class="chat-header">
			<div class="chat-molly">
				<Logo />

				<AskMolly />
			</div>

			<div class="right-side-header">
				<ChatButton expandButton={() => (expanded = !expanded)} />
			</div>
		</div>

		<ChatFeed data={messages} />

		<!-- Add the "on:message" event listener to the ChatInput component -->
		<ChatInput on:message={handleChatInputMessage} />
	</div>
{/if}

<style>
	.container {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 300px;
		height: 400px;
		background-color: #d9d9d9;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
	}

	.chat-header {
		background-color: #323e47;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.chat-molly {
		display: flex;
		flex-direction: row;
	}
</style>
