<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main class="p-5 w-full">
	<div class="prose max-w-none sm:w-3/4" id="prose-container">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>
