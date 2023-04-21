<script lang="ts">  
  import Logo from './components/chatLogo.svelte';
  import AskMolly from './components/chatHeading.svelte';
  import ChatInput from './components/chatInput.svelte';
  import ChatMessages from './components/chatMessage.svelte';
  export let expanded: boolean = false;
  
  </script>
  
  <style>
  
  .chat-bubble, .container {
  
   position: fixed;
   bottom: 0;
   right: 0;
   }
  
    
  .container {
  width: 300px;
  height: 400px;
  background-color: #147EC5;
  border: 3px solid #1169a4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  }
  
    
  
  .chat-header {
  background-color: #1169a4;
  border: 3px solid #0f5a8f;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  }

  .chat-molly{
  display: flex;
  flex-direction: row;
  }

  .chat-header button, .molly-bubble {
  padding: 10px;
  border: 1px solid #0f5a8f;
  background-color: #065285;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  }

  .molly-bubble {
  border-radius: 50px;
  }
  
  </style>


<!--This is the "chat-bubble" or the "molly-bubble"-->
  <div class="chat-bubble">
    
    <button class="molly-bubble" on:click={() => expanded = !expanded}> <Logo /></button>
  </div>
  
  <!--This is the div that displays the chat window
  
  this is located down on the right side of the page when the chat bubble is pressed-->
  
  {#if expanded}
  
  <div class="container">
  
  <div class="chat-header">
  
   <div class="chat-molly">
  
    <Logo />
  
    <AskMolly />
  
   </div>
  
   <div class="right-side-header">
  
   <button on:click={() => expanded = !expanded}>close</button>
  
   </div>
  
  </div>

    <ChatMessages />
  
    <ChatInput />
  
  </div>
  
  {/if}