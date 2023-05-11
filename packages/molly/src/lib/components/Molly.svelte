<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import MollyButton from './MollyButton.svelte';
	import MollyWindow from './MollyWindow.svelte';
	import sendChat from './icons/paper-plane.svg';
	export let img: string = sendChat;

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
			<div bind:this={scrollToDiv} />
		<form on:submit|preventDefault={() => handleSubmit()}>
			<textarea bind:value={query} />
			<button type="submit"> <img src={img} alt="Send message"> </button>
		</form>
		
		<!--<MollyForm
			on:userSubmit={(e) => {
				query = e.detail;
				handleSubmit();
			}}
		/>-->
		</MollyWindow>
</MollyButton>

<style lang="scss">
	.messages-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100%;
		overflow-y: scroll; /*scrolls the content if it overflows the viewport IT'S NOT WORKING*/
	}

	form {
		background-color: #323d47;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		bottom: 0;
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
