<script lang="ts">
	import AskMolly from './chatHeading.svelte';
	import ChatInput from './chatInput.svelte';
	import ChatFeed from './chatFeed.svelte';
	import ChatButton from './chatButton.svelte';
	import ChatBubble from './chatBubble.svelte';
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import { SSE } from 'sse.js';
	import MollyIcon from './MollyIcon.svelte';

	export let expanded: boolean = false;
	export let endpoint = '/';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: Message[] = [];

	function handleChatInputMessage(event: CustomEvent<Message>) {
		// Add the message payload to the messages array
		query = event.detail.content;
		handleSubmit();
	}

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = new SSE(endpoint, {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		query = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<ChatBubble expandButton={() => (expanded = !expanded)} />

{#if expanded}
	<div class="container">
		<div class="chat-header">
			<div class="chat-molly">
				<MollyIcon />

				<AskMolly />
			</div>

			<div class="right-side-header">
				<ChatButton expandButton={() => (expanded = !expanded)} />
			</div>
		</div>

		<ChatFeed data={chatMessages} />

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
