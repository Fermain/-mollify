<script lang="ts">
	export let data: Object;

	function handleTagClick() {
		// Forward user to tag relevant page
	}
</script>

<div
	class="tag"
	on:click={handleTagClick}
	on:keydown={(evt) => {
		if (evt.key === 'Enter') handleTagClick;
	}}
>
	#{data}
</div>

<style>
	.tag {
		color: var(--grey);
	}
</style>
