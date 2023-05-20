
<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import closeButton from './icons/angle-small-down.svg'
	let img: string = closeButton;

	export let isOpen = false;

	function onClick() {
		isOpen = !isOpen;
	}

</script>

	<div class="flex p-2 h-13 bg-slate-500 dark:bg-slate-800">
		<div class="flex-1 flex self-center gap-2">
			<Logo/>
			<h4 class="self-center text-lg font-medium">Ask Molly</h4>
		</div>
		<button on:click={onClick} class="btn-icon btn-icon-xl variant-filled-primary h-10 w-10 rounded flex-none"><img src={img} alt="close chat" class="h-8 w-8"/></button>
	</div>
	
