<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import resizeIcon from './icons/resize-placeholder.svg';
	let img: string = resizeIcon;

	export let toggleMollyOpen: () => void;
	export let toggleExpand: () => void;
</script>

<div class="flex p-2 bg-surface-100-800-token border border-slate-400 h-min w-full justify-between">
	<button
		class="w-10 bg-surface-800 rounded hover:bg-surface-700"
		on:click={toggleExpand}
		aria-label="resize chat box"
	>
		<img src={img} alt="resize" class="h-5 w-5 m-auto" />
	</button>

	<button
		on:click={toggleMollyOpen}
		class="btn-icon drop-shadow-md hover:drop-shadow-lg"
		aria-label="hide chat box"
	>
		<Logo />
	</button>
</div>
