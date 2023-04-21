<script lang=ts>
  import Logo from './chatLogo.svelte';
</script>

<style>
    
    .chat-content {
  background-color: #06528558;
  border: 3px solid #0f5a8f;
  flex-grow: 1;
  }
  
    
  
  .greeting {
  color: white;
  max-width: 70%;
  margin: 10px;
  cursor: default; 
  background-color: #0d5686; 
  border: 3px solid #1373b7;
  border-radius: 10px 10px 10px 10px;
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