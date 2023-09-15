
<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import resizeIcon from './icons/resize-placeholder.svg'
	let img: string = resizeIcon;

export let toggleMollyOpen:()=>void;
export let toggleExpand:()=>void;

</script>

	<div class="flex p-2 bg-surface-100-800-token border border-slate-400 h-min w-full">
		<div class="flex-1 flex self-center gap-2">
			

			<button class="px-2" on:click={toggleExpand}>
					<img src={img} alt="resize" class="h-5 w-5"/>
			</button>
			
		</div>
		<button on:click={toggleMollyOpen} class="btn-icon drop-shadow-md hover:drop-shadow-lg" aria-label="hide chat box">
			<Logo/>
		</button>
	</div>
	
