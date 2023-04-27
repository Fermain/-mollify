<script lang="ts">
</script>

<div class="wrapper">
	<nav class="icon-nav">
		<i class="icon-f">home</i>
		<i class="icon-f">home</i>
		<i class="icon-f">home</i>
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
</style>
