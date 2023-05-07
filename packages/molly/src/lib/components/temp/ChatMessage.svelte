<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import SvelteMarkdown from 'svelte-markdown';

	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
		<SvelteMarkdown source={message} />
	</div>
</div>
