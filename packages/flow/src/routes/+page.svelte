<!-- <script lang="ts">
	import InkMDEDemo from '$lib/components/InkMDEDemo.svelte';
</script>

<InkMDEDemo /> -->

<script>
	export let data;
</script>

<h1>Select the file you want to edit</h1>

<ul>
	{#each data.files as file}
		<li>
			<a href={file.path}> <h2>{file.meta.title}</h2></a>
		</li>
	{/each}
</ul>

<style>
	a {
		text-decoration: none;
	}
	li {
		list-style-type: none;
	}
</style>
