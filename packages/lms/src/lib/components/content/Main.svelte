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

	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 4px var(--primary);
		border-radius: var(--border-radius-xs);
		background-color: var(--background-primary);
	}

	::-webkit-scrollbar-thumb {
		background-color: var(--primary);
		border-radius: var(--border-radius-xs);
	}
</style>
