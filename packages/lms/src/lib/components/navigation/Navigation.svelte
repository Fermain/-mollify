<script lang="ts">
	export let type: String;
</script>

<nav class="block-nav {type}">
	{type} nav
</nav>

<style>
	nav {
		display: grid;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		background-color: var(--primary-ltr);
	}

	.module {
		grid-area: nav1;
	}

	.course {
		grid-area: nav2;
	}
</style>
