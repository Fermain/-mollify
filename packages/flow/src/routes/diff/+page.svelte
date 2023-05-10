<script lang="ts">
	import DiffDemo from '$lib/components/diff/DiffDemo.svelte';
	import JsdiffDemo from '$lib/components/diff/jsdiffDemo.svelte';
</script>

<div class="container">
	<div class="wrapper">
		<h2>DiffDemo</h2>
		<DiffDemo />
	</div>

	<div class="wrapper">
		<h2>JsdiffDemo</h2>
		<JsdiffDemo />
	</div>
</div>

<style lang="scss">
	.container {
		padding: 1rem 0.5rem;
	}

	.wrapper {
		margin: 3rem 0;
		border: 1px solid #ccc;
		padding: 0.5rem;
		& h2 {
			text-align: center;
		}
	}
</style>
