<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: Object;
</script>

<div
	class="py-1 hover:bg-primary-hover-token cursor-pointer"
	on:click={() => {
		dispatch('pageChange');
		goto(data.browserPath);
	}}
>
	{data.title}
</div>
