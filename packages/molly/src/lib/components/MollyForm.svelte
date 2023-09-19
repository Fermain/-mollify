<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DOMPurify from 'dompurify' //XXS Sanitizer (https://www.npmjs.com/package/dompurify)

  let query: string = '';
  const dispatch = createEventDispatcher();

  function handleKeyPress(event: KeyboardEvent) {
    //if statement to prevent empty query to be submitted
    if (query.length === 0 && event.key === 'Enter') {
      event.preventDefault();
    } else {
      //enable press Enter submit and Shit+Enter line break
      if (query.length > 0 && event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        //Sanitize user input 
        const sanitizedInput = DOMPurify.sanitize(query);
        dispatch('userSubmit', sanitizedInput);
        query = '';
      }
    }
  }
</script>

<div
  class="text-surface-800 dark:text-white bg-surface-100-800-token border-t border-slate-400 px-4 pt-2 drop-shadow-md bottom-0 w-full"
>
  <form class="h-full">
    <label for="userText">Ask Molly</label>
    <textarea
      bind:value={query}
      class="textarea bg-slate-100 dark:bg-slate-200 rounded-none p-1 text-black"
      placeholder="Your Query"
      id="userText"
      on:keypress={(event) => handleKeyPress(event)}
      autofocus
    />
    <small class=" dark:text-slate-400 text-right block">Enter to send. Shift + Enter for new line.</small>
  </form>
</div>
