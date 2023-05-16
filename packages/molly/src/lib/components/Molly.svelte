<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import MollyButton from './MollyButton.svelte';
	import MollyWindow from './MollyWindow.svelte';
	import MollyForm from './MollyForm.svelte';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	export let endpoint = '/';

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = new SSE(endpoint, {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e) => {
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

<MollyButton>
	<MollyWindow>
			<div class="messages-container">
				{#each chatMessages as message}
					<MollyMessage type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<MollyMessage type="assistant" message={answer} />
				{/if}
				{#if loading}
					<MollyMessage type="assistant" message="Thinking.." />
				{/if}
			</div>
		<MollyForm
			on:userSubmit={(e) => {
				query = e.detail;
				handleSubmit();
			}}
		/>
		</MollyWindow>
</MollyButton>

<style lang="scss">
	.messages-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 300%;
		overflow-y: scroll; /*scrolls the content if it overflows the viewport IT'S NOT WORKING*/
	}

	.messages-container::-webkit-scrollbar {
		width: 0.5rem;
		color: #21a299;
	}
</style>
