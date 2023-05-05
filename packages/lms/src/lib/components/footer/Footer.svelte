<script lang="ts"></script>

<footer>
	<slot />
</footer>

<style>
	footer {
		grid-area: footer;
		display: flex;
		gap: 0.5rem;
		background-color: var(--primary);
	}

	@media screen and (max-width: 935px) {
		footer {
			grid-area: 4 / 1 / 5 / 5;
		}
	}
</style>
