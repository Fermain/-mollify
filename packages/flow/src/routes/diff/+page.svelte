<script lang="ts">
	import DiffDemo from '$lib/components/diff/DiffDemo.svelte';
	import JsdiffDemo from '$lib/components/diff/jsdiffDemo.svelte';
	import SimpleTextDiffDemo from '$lib/components/diff/SimpleTextDiffDemo.svelte';
	import PrettyDiffDemo from '$lib/components/diff/PrettyDiffDemo.svelte';
</script>

<div class="container">
	<div class="wrapper">
		<h2>Diff</h2>
		<DiffDemo />
	</div>

	<div class="wrapper">
		<h2>jsdiff</h2>
		<JsdiffDemo />
	</div>

	<div class="wrapper">
		<h2>SimpleTextDiff</h2>
		<SimpleTextDiffDemo />
	</div>

	<div class="wrapper">
		<h2>PrettyDiffDemo</h2>
		<PrettyDiffDemo />
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
