<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import SvelteMarkdown from 'svelte-markdown';

	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="message {type} max-w-full m-0 bg-slate-400 dark:bg-slate-800 py-2.5 px-1">
	<SvelteMarkdown source={message} />
</div>

<style lang="scss">


	.assistant {
		background-color: #748BA7;
		color: black;
	}

	.user {
		text-align: right;
	}
</style>

