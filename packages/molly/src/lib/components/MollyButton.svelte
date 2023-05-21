<script>
	import MollyIcon from './MollyIcon.svelte';

	export let isOpen = false;

	export function onClick() {
		isOpen = !isOpen;
	}
</script>

<button on:click={onClick} class="btn-icon btn-icon-xl fixed bottom-0 right-0 variant-filled-primary">
	<MollyIcon />
</button>

{#if isOpen}
  <slot />
{/if}

