<script lang="ts">
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyMessage from './MollyMessage.svelte';

	export let messages: Message[];
	export let answer: string;
	export let loading: boolean;

</script>

<div class="messages-container bg-slate-200 dark:bg-slate-300 flex flex-col-reverse overflow-y-scroll h-full">
	<div class="wrapper">
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
</div>
