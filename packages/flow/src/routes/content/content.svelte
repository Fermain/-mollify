<script lang="ts">
	import '../../app.css';

	// adding types makes the server crash
	export let title;
	export let tags;
</script>

<div>
	<h1>{title}</h1>

	<ul class="tags">
		{#each tags as tag}
			<li class="tag">{tag}</li>
		{/each}
	</ul>

	<slot />
</div>

<style>
	.tag {
		background-color: aqua;
		padding: 0.5rem;
		border-radius: 4px;
		margin-right: 1rem;
	}
</style>
