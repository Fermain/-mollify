<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import MollyButton from './MollyButton.svelte';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let scrollToDiv: HTMLDivElement;
	export let endpoint = '/';

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
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

		eventSource.addEventListener('message', (e) => {
			scrollToBottom();
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
		scrollToBottom();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<MollyButton>
	<div class="molly">
		<div>
			<div>
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
			<div bind:this={scrollToDiv} />
		</div>
		<form on:submit|preventDefault={() => handleSubmit()}>
			<input type="text" bind:value={query} />
			<button type="submit"> Send </button>
		</form>
	</div>
</MollyButton>


<style>
	form {
		display: flex;
	}

	input {
		flex: 1;
	}
</style>
