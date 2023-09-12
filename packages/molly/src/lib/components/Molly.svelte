<script lang="ts">
	import MollyMessage from '$lib/components/MollyMessage.svelte';
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyButton from './MollyButton.svelte';
	import MollyForm from './MollyForm.svelte';
	import { readableStreamStore } from '../stores/readableStream';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let messages = new Array<Message>();
	export let endpoint = '/';

	const response = readableStreamStore();
	response.subscribe(($response) => {
		loading = $response.loading;
		answer = $response.text;
	});

	function lazyContentGrabber() {
		const main = document.querySelector('main');
		if (main) {
			return main.textContent;
		}
	}

	const handleSubmit = async () => {
		try {
			const promiseReply = response.request(
				new Request(endpoint, {
					method: 'POST',
					body: JSON.stringify({
						messages,
						query,
						documentContent: lazyContentGrabber(),
						name: 'Ask the Noroff student their name'
					})
				})
			);

			messages = [...messages, { role: 'user', content: query }];

			(await promiseReply) || '';

			messages = [...messages, { role: 'assistant', content: answer }];
			answer = '';
			query = '';
		} catch (err) {
			alert(err);
		}
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
