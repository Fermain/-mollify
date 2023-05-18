<script lang="ts">
</script>

<div class="wrapper">
	<nav class="icon-nav">
		<i class="icon-f">home</i>
		<i class="icon-f">bookmark</i>
		<i class="icon-f">bookmark_add</i>
	</nav>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		background-color: var(--primary);
		color: var(--text-secondary);
		grid-area: icons;

		container-name: wrapper;
		container-type: inline-size;
	}

	.icon-nav {
		display: grid;
		justify-items: center;
		gap: var(--spacing-m);
		padding: var(--spacing-m) 0;
		height: min-content;
	}

	@container (min-width: 100px) {
		.wrapper {
			.icon-nav {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				height: 100%;
			}
		}
	}
</style>
