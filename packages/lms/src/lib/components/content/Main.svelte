<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main class="main">
	<div class="main-inner">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>

<style lang="scss">
	.main {
		grid-area: body;
		overflow-y: auto;

		/* for firefox users*/
		scrollbar-color: var(--primary) var(--background-primary);
		scrollbar-width: thin;

		max-width: 100ch;

		container-name: main;
		container-type: inline-size;

		&-inner {
			height: 100%;
			width: 100%;
		}
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

	@container (max-width: 80ch) {
		.main {
			&-inner {
				background-image: linear-gradient(
					45deg,
					rgba(255, 0, 0, 0.5) 25%,
					rgba(255, 232, 102, 0.5) 25%,
					rgba(255, 232, 102, 0.5) 50%,
					rgba(255, 0, 0, 0.5) 50%,
					rgba(255, 0, 0, 0.5) 75%,
					rgba(255, 232, 102, 0.5) 75%,
					rgba(255, 232, 102, 0.5) 100%
				);
				background-size: 40px 40px;
				&:before {
					content: 'WARNING: Below ideal width!';
					color: white;
					font-weight: bold;
					font-size: 2rem;
					text-shadow: 0 0 5px black;
				}
			}
		}
	}

	@container (max-width: 50ch) {
		.main {
			&-inner {
				background-image: linear-gradient(
					45deg,
					#ff0000 25%,
					#ffe866 25%,
					#ffe866 50%,
					#ff0000 50%,
					#ff0000 75%,
					#ffe866 75%,
					#ffe866 100%
				);
				background-size: 20px 20px;
				&:before {
					content: 'TOO SMALL';
					color: white;
					font-weight: bold;
					font-size: 2rem;
					text-shadow: 0 0 5px black;
				}
			}
		}
	}
</style>
