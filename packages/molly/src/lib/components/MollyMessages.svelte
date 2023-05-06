<script lang="ts">
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyMessage from './MollyMessage.svelte';
	import MollyAlert from './MollyAlert.svelte';

	export const messages = new Array<Message>();
</script>

{#each messages as message}
	<MollyMessage {message} />
{:else}
	<MollyAlert type="info" message="No messages yet." />
{/each}
