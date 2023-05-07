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