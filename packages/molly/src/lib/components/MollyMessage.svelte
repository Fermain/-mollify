<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import SvelteMarkdown from 'svelte-markdown';

	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="message {type}">
	<SvelteMarkdown source={message} />
</div>
