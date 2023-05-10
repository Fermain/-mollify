<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main>
	<div class="wrapper">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>

<style lang="scss">
	main {
		grid-area: body;
		overflow-y: auto;
		max-width: 110ch;
		container-type: inline-size;

		/* for firefox users*/
		scrollbar-color: var(--primary) var(--background-primary);
		scrollbar-width: thin;
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

	@container (max-width: 870px) {
		main {
			.wrapper {
				padding: 0 var(--spacing-s);
			}
		}
	}
</style>
