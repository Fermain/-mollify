<script>
	import MollyHeader from './MollyHeader.svelte';
	import MollyIcon from './MollyIcon.svelte';

	export let isOpen = false;

	export function onClick() {
		isOpen = !isOpen;
	}
</script>

<button on:click={onClick} class="btn-icon btn-icon-xl fixed bottom-0 right-0 variant-filled-primary drop-shadow-md">
	<MollyIcon />
</button>

{#if isOpen}
	<div class="chat-container fixed bottom-0 right-0 w-80 drop-shadow-md">
		<MollyHeader bind:isOpen />
		<slot />
	</div>
{/if}

