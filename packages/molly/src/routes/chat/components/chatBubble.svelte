<script lang="ts">
  import Logo from './chatLogo.svelte';
  export let expanded: boolean = false;

export let expandButton = () => {
  expanded = !expanded;
}
</script>

<style>
  .chat-bubble {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-radius: 50px;
  background-color: #323E47;
  color: white;
  cursor: pointer;
  }
</style>

    <button class="chat-bubble" on:click={expandButton}> <Logo /></button>
  
