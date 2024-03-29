<script lang="ts">
  import type { ChatCompletionRequestMessage as Message } from 'openai';
  import { readableStreamStore } from '../stores/readableStream';
  import MollyButton from './MollyButton.svelte';
  import MollyForm from './MollyForm.svelte';
  import MollyMessages from './MollyMessages.svelte';
  import MollyHeader from './MollyHeader.svelte';

  let container: HTMLElement | null;
  let query: string = '';
  let answer: string = '';
  let loading: boolean = false;
  let isOpen: boolean = false;
  let isExpanded: boolean = false;
  let messages = new Array<Message>();
  export let endpoint = '/';

  const response = readableStreamStore();
  response.subscribe(($response) => {
    loading = $response.loading;
    answer = $response.text;
  });

  function lazyContentGrabber() {
    const main = document.querySelector('main');
    if (main) {
      return main.textContent;
    }
  }

  const handleSubmit = async () => {
    try {
      const promiseReply = response.request(
        new Request(endpoint, {
          method: 'POST',
          body: JSON.stringify({
            messages,
            query,
            documentContent: lazyContentGrabber(),
            name: 'Ask the Noroff student their name'
          })
        })
      );

      messages = [...messages, { role: 'user', content: query }];

      (await promiseReply) || '';

      messages = [...messages, { role: 'assistant', content: answer }];
      answer = '';
      query = '';
    } catch (err) {
      alert(err);
    }
  };

  function handleError<T>(err: T) {
    loading = false;
    query = '';
    answer = '';
  }

  export function toggleMollyOpen() {
    isOpen = !isOpen;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
    if (container) {
      container.style.cssText = '';
    }
  }
  function closeMollyOnPressEsc(event: KeyboardEvent) {
    if (event?.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<div>
  <MollyButton {toggleMollyOpen} />
  {#if isOpen}
    <div
      bind:this={container}
      class="chat-container fixed bottom-0 right-0 drop-shadow-md {isExpanded
        ? 'w-full sm:w-[700px] h-full'
        : 'w-80 h-96'}"
      on:keydown={(event) => closeMollyOnPressEsc(event)}
    >
      <div class="inner flex flex-col border border-slate-400 h-full">
        <MollyHeader {toggleMollyOpen} {toggleExpand} />
        <MollyMessages {loading} {messages} {answer} />
        <MollyForm
          on:userSubmit={(e) => {
            query = e.detail;
            handleSubmit();
          }}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .chat-container {
    transform: rotateZ(180deg); /* Positioning resize to top left corner */
    resize: both;
    overflow: auto;
    max-width: 100vw;
    max-height: 100vh;
    min-width: 200px;
    min-height: 40%;
    z-index: 100;
  }

  .inner {
    transform: rotateZ(180deg);
  }
</style>
