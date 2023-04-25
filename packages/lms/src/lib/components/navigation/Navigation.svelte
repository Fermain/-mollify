<script lang="ts">
	let searchValue: String;
</script>

<nav class="block-nav">
	<i class="icon-f">home</i>
	<input type="search" bind:value={searchValue} placeholder="Search..." />
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		grid-area: nav;
		justify-content: center;
		width: 200px;
		height: 200px;
		top: var(--spacing-xxl);
		left: 0;
		background-color: var(--primary-ltr);
		position: absolute;
	}

	input {
		grid-area: reader;
		width: 50%;
		margin: 0 auto;
	}
</style>
