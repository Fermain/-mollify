<script lang=ts>
  import Logo from './chatLogo.svelte';
</script>

<style>
    
  .chat-content {
  flex-grow: 1;
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

<div class="chat-content">
  <div class="greeting">
    <Logo />
   <span>Hello, what can I do for you?</span>

  </div>

</div>