<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DOMPurify from 'dompurify'; //XXS Sanitizer (https://www.npmjs.com/package/dompurify)

  let query: string = '';
  let textarea: HTMLTextAreaElement;

  const dispatch = createEventDispatcher();

  function handleKeyPress(event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }) {
    // auto-resize textarea
    textarea.style.height = 'auto';
    let scrollHeight = event.currentTarget.scrollHeight as number;
    textarea.style.height = `${scrollHeight}px`;

    //enable press Enter submit and Shit+Enter line break
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      //if statement to prevent empty query to be submitted
      if (query.trim().length > 0) {
        //Sanitize user input
        const sanitizedInput = DOMPurify.sanitize(query);

        dispatch('userSubmit', sanitizedInput);
        query = '';
        textarea.style.height = 'auto';
      }
    }
  }
</script>

<div
  class="text-surface-800 dark:text-white bg-surface-100-800-token border-t border-slate-400 px-4 pt-2 drop-shadow-md bottom-0 w-full flex flex-col max-h-[50%]"
>
  <!-- <form class="h-full"> -->
  <label for="block userText">Ask Molly</label>
  <textarea
    bind:this={textarea}
    bind:value={query}
    class="textarea block bg-slate-100 dark:bg-slate-200 rounded rounded-1 p-2 my-1 text-black max-h-[80%] overflow-y-scroll hide-scrollbar"
    placeholder="Your Query"
    id="userText"
    on:keyup={(event) => handleKeyPress(event)}
    autofocus
  />
  <small class=" dark:text-slate-400 text-right block">Enter to send. Shift + Enter for new line.</small>
  <!-- </form> -->
</div>
