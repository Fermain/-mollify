<script lang="ts">
	import { onMount } from 'svelte';
	import InkMde from 'ink-mde/svelte';

	let apiCall: string = '/api/fetchRemote';
	let oldText: string = '';
	let value: string = '';

	onMount(async () => {
		const response = await fetch(apiCall);
		const data: string = await response.text();
		oldText = data;
		value = data;
	});

	function displayContents(): void {
		console.log(value);
	}
</script>

<div>
	<h1>Editor</h1>
	<button class="primary-btn" on:click={displayContents}>Compare changes</button>
	<InkMde
		bind:value
		options={{
			interface: {
				appearance: 'light',
				toolbar: true
			},
			readability: true,
			toolbar: {
				bold: true,
				code: true,
				codeBlock: true,
				heading: true,
				image: true,
				italic: true,
				link: true,
				list: true,
				orderedList: true,
				quote: true,
				taskList: true,
				upload: true
			}
		}}
	/>
	<button class="primary-btn" on:click={displayContents}>Compare changes</button>
</div>

<style lang="scss">
	.primary-btn {
		background-color: rgb(255, 47, 2);
		color: white;
		border: none;
		margin: 3rem 0;
		padding: 0.5rem 1rem;
		font-size: 16px;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			opacity: 0.9;
		}
	}
</style>
