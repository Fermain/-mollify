<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	import SvelteMarkdown from 'svelte-markdown';

	export let message: ChatCompletionRequestMessage;
</script>

<div
	class="message {message.role} max-w-full  bg-slate-200 dark:bg-slate-400 py-2.5 px-1 m-3 rounded rounded-1 text-black"
>
	<SvelteMarkdown source={message.content} />
</div>

<style lang="scss">
	.assistant {
		background-color: rgb(173, 183, 194);
	}

	.user {
		text-align: right;
	}
</style>
