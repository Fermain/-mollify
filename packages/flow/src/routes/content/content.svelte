<script lang="ts">
	import '../../app.css';
	export let title;
	export let tags;
</script>

<div>
	<h1>{title}</h1>

	<div>
		{#each tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>

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
