<script lang="ts">
	import DiffDemo from '$lib/components/diff/DiffDemo.svelte';
	import JsdiffDemo from '$lib/components/diff/jsdiffDemo.svelte';

	console.log(JsdiffDemo);
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

	<div class="wrapper">
		<h2>TUI Editor</h2>
	</div>

	<div class="wrapper">
		<h2>Simple mde</h2>
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
