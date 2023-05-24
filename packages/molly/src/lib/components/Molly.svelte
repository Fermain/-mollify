<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import MollyButton from './MollyButton.svelte';
	import MollyForm from './MollyForm.svelte';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	export let endpoint = '/';

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const endpointWithParams = `${endpoint}?messages=${encodeURIComponent(query)}`;

		const eventSource = new EventSource(endpointWithParams);

		eventSource.onerror = handleError;

		eventSource.onmessage = (e) => {
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
		};
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<MollyButton>
	<div class="h-full grid grid-rows-[1fr_auto] border border-slate-400">
		<div
			class="messages-container h-80 bg-slate-200 dark:bg-slate-300 overflow-y-auto"
		>
			{#each chatMessages as message}
				<MollyMessage type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<MollyMessage type="assistant" message={answer} />
			{/if}
			{#if loading}
				<MollyMessage type="assistant" message="Thinking..." />
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
