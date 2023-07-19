<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyButton from './MollyButton.svelte';
	import MollyForm from './MollyForm.svelte';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let messages = new Array<Message>();
	export let endpoint = '/';

	function lazyContentGrabber() {
		const main = document.querySelector('main');
		if (main) {
			return main.textContent;
		}
	}

	const handleSubmit = async () => {
		loading = true;
		messages = [...messages, { role: 'user', content: query, name: "Student" }];

		const params = new URLSearchParams();

		params.append('messages', JSON.stringify(messages));
		params.append('content', lazyContentGrabber() ?? '');
		params.append('name', 'Ask the Noroff student their name');

		const endpointWithParams = `${endpoint}?${params.toString()}`;

		const eventSource = new EventSource(endpointWithParams);

		eventSource.onerror = handleError;

		eventSource.onmessage = (e) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					messages = [...messages, { role: 'assistant', content: answer }];
					answer = '';
					eventSource.close();
					return;
				}

				const response = JSON.parse(e.data);
				const [{ delta }] = response.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
				eventSource.close();
			}
		};
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
	}
</script>

<MollyButton>
	<div class="h-full grid grid-rows-[1fr_auto] border border-slate-400">
		<div class="messages-container h-80 bg-slate-200 dark:bg-slate-300 overflow-y-auto">
			{#each messages as message}
				<MollyMessage {message} />
			{/each}
			{#if answer}
				<MollyMessage
					message={{
						role: 'assistant',
						content: answer
					}}
				/>
			{/if}
			{#if loading}
				<MollyMessage
					message={{
						role: 'assistant',
						content: 'Thinking...'
					}}
				/>
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
