<script lang="ts">
  import type { ChatCompletionRequestMessage as Message } from 'openai';

  export let message: Message;
</script>

<div class={`message-${message.role}`}>
  {message.content}
</div>

<style lang="scss">
	.message-user {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: white;
		max-width: 100%;
		margin: 0;
		background-color: #323e47b8;
		cursor: default;
		padding: 10px;
	}


	/*img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}*/
</style>