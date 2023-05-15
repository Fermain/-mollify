<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: Object;
</script>

<div
	class="search-item"
	on:click={() => {
		dispatch('pageChange');
		goto(data.browserPath);
	}}
>
	{data.title}
</div>

<style lang="scss">
	.search-item {
		padding: var(--spacing-s) var(--spacing-xxs);
		background-color: var(--background-primary);
		border-radius: var(--spacing-xxs);
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
	}
</style>
