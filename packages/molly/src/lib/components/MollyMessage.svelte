<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import SvelteMarkdown from 'svelte-markdown';

	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="message {type}">
	<SvelteMarkdown source={message} />
</div>

<style lang="scss">
	.message {
		color: white;
		max-width: 100%;
		margin: 0;
		background-color: #323e47b8;
		cursor: default;
		padding: 5px 10px;
	}

	.assistant {
		background-color: #323d47;
	}

	.user {
		text-align: right;
	}
</style>

