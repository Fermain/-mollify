
<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import closeButton from './icons/angle-small-down.svg'
	let img: string = closeButton;

export let toggleMollyOpen:()=>void;

</script>

	<div class="flex p-2 bg-surface-100-800-token border border-slate-400 h-min w-full">
		<div class="flex-1 flex self-center gap-2">
			
			<!-- // Resize btn goes here....
			<div class="flex-0 w-8">
					<img src={img} alt="resize" class="h-8 w-8"/>
			</div> -->
			
		</div>
		<button on:click={toggleMollyOpen} class="flex-0 w-8" aria-label="hide chat box">
			<Logo/>
		</button>
	</div>
	
