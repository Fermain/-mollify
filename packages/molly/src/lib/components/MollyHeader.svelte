
<script lang="ts">
	import Logo from './MollyIcon.svelte';
	import MollyCloseButton from './MollyCloseButton.svelte';
</script>

	<div class="flex p-2 h-13 bg-slate-500 dark:bg-slate-800">
		<div class="flex-1 flex self-center gap-2">
			<Logo/>
			<h4 class="self-center text-lg font-medium">Ask Molly</h4>
		</div>
		<MollyCloseButton on:click{onClick}/>
	</div>
	
