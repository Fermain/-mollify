<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main class="p-5 w-full relative">
	<div class="prose max-w-none" id="prose-container">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>
