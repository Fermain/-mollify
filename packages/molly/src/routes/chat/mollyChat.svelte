<script lang="ts"> 
  import Logo from './components/chatLogo.svelte';
  import AskMolly from './components/chatHeading.svelte';
  import ChatInput from './components/chatInput.svelte';
  import ChatMessages from './components/chatMessage.svelte';
  import ChatButton from './components/chatButton.svelte';
  import ChatBubble from './components/chatBubble.svelte';
  export let expanded: boolean = false;  
</script>
  
<style>
    
  .container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 400px;
    background-color: #D9D9D9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    background-color: #323E47;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .chat-molly{
    display: flex;
    flex-direction: row;
  }

  </style>


  <!--This is the "chat-bubble" or the "molly-bubble"-->
 <ChatBubble expandButton={() => expanded = !expanded}/>
  
  <!--This is the div that displays the chat window
  
  this is located down in the right side of the page when the chat bubble is pressed-->
  
  {#if expanded}
  
    <div class="container">
    
    <div class="chat-header">
    
    <div class="chat-molly">
    
      <Logo />
    
      <AskMolly />
    
    </div>
    
    <div class="right-side-header">
    
    <ChatButton expandButton={() => expanded = !expanded}/>
    
    </div>
    
    </div>

      <ChatMessages />
    
      <ChatInput />
    
    </div>
  
  {/if}