<script lang="ts">
	import DiffDemo from '$lib/components/DiffDemo.svelte';
	import EditorDemo from '$lib/components/EditorDemo.svelte';
	import EasyMDEDemo from '$lib/components/EasyMDEDemo.svelte';
	import InkMDEDemo from '$lib/components/InkMDEDemo.svelte';
</script>

<!-- <DiffDemo /> -->

<div class="container">
	<div class="wrapper">
		<h2>Easy mde</h2>
		<EasyMDEDemo />
	</div>

	<div class="wrapper">
		<h2>Ink MDE</h2>
		<InkMDEDemo />
	</div>

	<div class="wrapper">
		<h2>TUI Editor</h2>
		<EditorDemo />
	</div>
</div>

<style lang="scss">
	.container {
		background-color: #ccc;
		padding: 1rem 0.5rem;
	}

	.wrapper {
		margin: 3rem 0;
		background-color: #fff;
		padding: 0.5rem;
		& h2 {
			text-align: center;
		}
	}
</style>
