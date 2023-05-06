<script lang="ts">
  import type { ChatCompletionRequestMessage as Message } from 'openai';

  export let message: Message;
</script>

<div class={`message ${message.role}`}>
  {message.content}
</div>