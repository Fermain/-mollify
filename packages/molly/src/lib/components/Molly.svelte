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
	let elemChat: HTMLElement; 
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
		scrollChatBottom('smooth');
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}

	
function scrollChatBottom(behavior?: ScrollBehavior): void {
	elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
}
				


</script>

<MollyButton>
	<div class="chat-container fixed bottom-0 right-0 w-80 bg-slate-200 dark:bg-slate-600">
		<MollyWindow/>
			<div class="h-full grid grid-rows-[1fr_auto]">
					<div bind:this={elemChat} class="messages-container h-80 bg-surface-500/30 overflow-y-auto">
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
</div>
</MollyButton>


<!--
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
-->