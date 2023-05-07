<script>
	import MollyIcon from './MollyIcon.svelte';

	export let isOpen = false;

	function onClick() {
		isOpen = !isOpen;
	}
</script>

<button on:click={onClick}>
	<MollyIcon />
</button>

{#if isOpen}
  <slot />
{/if}

<style>
  button {
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