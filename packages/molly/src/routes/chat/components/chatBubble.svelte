<script lang="ts">
  import Logo from './chatLogo.svelte';
</script>

<style>
   .chat-bubble {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border: 1px solid #0f5a8f;
  border-radius: 5px;
  background-color: #065285;
  color: white;
  cursor: pointer;
  }
</style>

<div>
  
    <button class="chat-bubble"> <Logo /></button>
  
  </div>