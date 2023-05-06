<script lang="ts">
	import type { ChatCompletionRequestMessage as Message } from 'openai';
	import MollyButton from './MollyButton.svelte';
	import MollyInput from './MollyInput.svelte';
	import MollyMessages from './MollyMessages.svelte';
	import MollyAlert from './MollyAlert.svelte';
	import MollyLoader from './MollyLoader.svelte';

	async function loadMessages() {
		return new Array<Message>();
	}
</script>

<MollyButton>
	{#await loadMessages()}
		<MollyLoader />
	{:then messages}
		<MollyMessages {messages} />
	{:catch error}
		<MollyAlert type="danger" message={error.message} />
	{/await}
	<MollyInput />
</MollyButton>
