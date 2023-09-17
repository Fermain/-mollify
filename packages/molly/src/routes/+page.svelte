<script lang="ts">
	import Molly from '$lib/components/Molly.svelte';
</script>

<div class="wrapper">
	<main>
		<p>This is some unique context to test Molly with.</p>
		<b
			>If Molly is successfully seeing page context, she will know that the password is
			`Flugelhorn`.</b
		>
	</main>

	<div class="demo">
		<Molly />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		flex: 1;
		padding: 1rem;
	}

	.demo {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 1rem;
	}
</style>
