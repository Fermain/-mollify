<script lang="ts">
	import MollyIcon from './MollyIcon.svelte';

	export let expanded: boolean = false;

	export let expandButton = () => {
		expanded = !expanded;
	};
</script>

<button class="chat-bubble" on:click={expandButton}> <MollyIcon /></button>

<style>
	.chat-bubble {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 10px;
		border-radius: 50px;
		background-color: #323e47;
		color: white;
		cursor: pointer;
	}
</style>
