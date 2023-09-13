<script lang='ts'>
	import MollyHeader from './MollyHeader.svelte';
	import MollyIcon from './MollyIcon.svelte';

	export let isOpen:boolean = false;

	export function toggleMollyOpen(){
		isOpen = !isOpen;	
	}
</script>

<button on:click={toggleMollyOpen} class="btn-icon btn-icon-xl drop-shadow-md aspect-1">
	<MollyIcon />
</button>

{#if isOpen}
	<div class="chat-container fixed bottom-0 right-0 w-80 drop-shadow-md">
		<MollyHeader {toggleMollyOpen}/>
		<slot />
	</div>
{/if}

