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

		/*if new suggested layout is accepted uncomment this*/
		/* max-width: 100ch; */
	}
</style>
