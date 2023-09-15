<script lang='ts'>
	// import MollyHeader from './MollyHeader.svelte';
	import MollyIcon from './MollyIcon.svelte';

export let toggleMollyOpen:()=>void;
</script>

<button on:click={toggleMollyOpen} class="btn-icon btn-icon-xl drop-shadow-md aspect-1">
	<MollyIcon />
</button>



