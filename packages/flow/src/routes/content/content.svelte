<script lang="ts">
	import '../../app.css';
	export let title: string;
	export let tags: string[];
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
