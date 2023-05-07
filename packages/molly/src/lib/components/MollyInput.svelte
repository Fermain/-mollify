<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onInput(event: Event) {
    // Resize logic
  }

  function onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const textarea = form.querySelector("textarea")!;
    const message = textarea.value.trim();
    dispatch("user", message);
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <textarea on:input={onInput} cols="30" rows="10"></textarea>
  <button>Send</button>
</form>
