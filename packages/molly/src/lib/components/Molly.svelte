<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import { onMount } from 'svelte';
	import MollyButton from './MollyButton.svelte';
	import MollyHeader from './MollyHeader.svelte';
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

<MollyButton>
			<div class="h-full grid grid-rows-[1fr_auto]">
					<div bind:this={chatWindow} class="messages-container h-80 bg-surface-500/30 overflow-y-auto">
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
			</div>
</MollyButton>
