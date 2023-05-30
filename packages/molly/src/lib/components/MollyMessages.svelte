<script lang="ts">
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyMessage from './MollyMessage.svelte';

	export const messages = new Array<Message>();
	export let answer: string;
	export let loading: boolean;
</script>

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