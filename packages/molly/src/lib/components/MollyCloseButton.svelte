<script lang="ts">
	import closeButton from './icons/angle-small-down.svg'
	let img: string = closeButton;

	export let isOpen = false;

	export function onClick() {
		isOpen = !isOpen;
    console.log('clicked');
	}
</script>

<button on:click={onClick} class="btn-icon btn-icon-xl rounded h-8 w-8 variant-filled-primary">
	<img src={img} alt="close chat" class="h-8 w-8"/>
</button>

{#if isOpen}
  <slot />
{/if}
