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
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 3rem;
		}
	}
</style>
