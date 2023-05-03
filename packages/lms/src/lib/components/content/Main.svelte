<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main>
	<ProgrammeNav>
		<slot />
	</ProgrammeNav>
</main>

<style>
	main {
		grid-area: body;
		overflow-y: auto;
	}
</style>
