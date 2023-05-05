<script lang="ts">
</script>

<div class="wrapper">
	<nav class="icon-nav">
		<i class="icon-f">home</i>
		<i class="icon-f">bookmark</i>
		<i class="icon-f">bookmark_add</i>
		<i class="icon-f">home</i>
		<i class="icon-f">home</i>
		<i class="icon-f">home</i>
		<i class="icon-f">home</i>
	</nav>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: var(--spacing-m) 0;
	}

	.icon-nav {
		grid-area: icons;
		display: grid;
		justify-items: center;
		gap: var(--spacing-m);
		height: min-content;
	}

	i {
		height: min-content;
	}

	@media screen and (max-width: 935px) {
		.wrapper {
			grid-area: 2 / 1 / 3 / 2;
		}
	}
</style>
