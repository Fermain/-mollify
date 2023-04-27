<script lang=ts>
  import { onMount } from 'svelte';
  import Logo from './chatLogo.svelte';

  onMount(() => {
    //Scroll to the bottom of the chat window
    const chatWindow: HTMLElement | null = document.querySelector('.chat-content');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  });

  //Watch for changes in the messages array and scroll to the bottom of the chat window
  $: {
    const chatWindow: HTMLElement | null = document.querySelector('.chat-content');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }

</script>

<div class="chat-content">
  <div class="greeting">
    <Logo />
   <span>Hello, what can I do for you?</span>
  </div>

</div>

<style>
    
  .chat-content {
  flex-grow: 1;
  overflow-y: auto;
  }
  
  .greeting {
  color: white;
  max-width: 100%;
  margin: 0;
  margin: 5px 0px 5px 0px;
  background-color: #323e47e8;
  cursor: default; 
  padding: 10px;
  display: flex; 
  }


  span {
    margin-left: 10px;
  }
  
</style>
