
<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import closeButton from './icons/angle-small-down.svg'
	let img: string = closeButton;

export let toggleMollyOpen:()=>void;

</script>

	<div class="flex p-2 h-13 bg-surface-100-800-token border border-slate-400">
		<div class="flex-1 flex self-center gap-2">
			<div class="flex-0 w-8">
				<Logo/>
			</div>
			
			<!-- <h4 class="self-center text-lg font-medium">Ask Molly</h4> -->
		</div>
		<button on:click={toggleMollyOpen} class="btn-icon btn-icon-xl rounded h-8 w-8 variant-filled-primary">
			<img src={img} alt="hide chat" class="h-8 w-8"/>
		</button>
	</div>
	
