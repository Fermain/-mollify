<script lang="ts">
	import { afterUpdate } from 'svelte';
	import InkMde from 'ink-mde/svelte';
	import { marked } from 'marked';
	import { displayPreview } from '$lib/utils/displayPreview';
	import { displayDiff } from '$lib/utils/displayDiff';
	import { generateDiff } from '$lib/utils/generateDiff';
	import { styleCallouts } from '$lib/utils/styleCallouts';
	import '../../app.css';
	import createFrontmatterTable from '$lib/utils/createFrontmatterTable';

	export let oldText: string = '';
	export let value: string = '';

	let frontmatter: HTMLTableElement | null;

	export let diffHtml: string = '';

	export let isPreviewDisplayed: boolean = false;

	export let isDiffDisplayed: boolean = false;

	afterUpdate(() => {
		styleCallouts();

		if (value !== '') {
			frontmatter = createFrontmatterTable();
		}
	});
</script>

<div>
	<h1>Editor</h1>
	<div class="btn-wrapper">
		<a
			href="/#demo"
			class="primary-btn"
			on:click={() => (isPreviewDisplayed = displayPreview(isPreviewDisplayed))}>Preview file</a
		>
		<a
			href="/#diff"
			class="secondary-btn"
			on:click={() => {
				diffHtml = generateDiff(oldText, value);
				isDiffDisplayed = displayDiff(isDiffDisplayed);
			}}>Display diff</a
		>
	</div>
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
</div>
<div class="btn-wrapper">
	<a
		href="/#demo"
		class="primary-btn"
		on:click={() => (isPreviewDisplayed = displayPreview(isPreviewDisplayed))}>Preview file</a
	>
	<a
		href="/#diff"
		class="secondary-btn"
		on:click={() => {
			diffHtml = generateDiff(oldText, value);
			isDiffDisplayed = displayDiff(isDiffDisplayed);
		}}>Display diff</a
	>
</div>

{#if isPreviewDisplayed}
	<h2>File preview</h2>
	<div id="demo" class="demo">
		{#if frontmatter}
			{@html frontmatter.outerHTML}
		{/if}
		{@html marked(value)}
	</div>
{/if}

{#if isDiffDisplayed}
	<h2>File diff</h2>
	<div id="diff" class="demo">
		{@html diffHtml}
	</div>
{/if}

<style lang="scss">
	.btn-wrapper {
		margin: 3rem 0;
		display: flex;
		gap: 1rem;
	}

	.primary-btn,
	.secondary-btn {
		background-color: rgb(255, 47, 2);
		color: white;
		border: none;
		text-decoration: none;
		padding: 0.5rem 1rem;
		font-size: 16px;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			opacity: 0.9;
		}
	}

	.secondary-btn {
		background-color: transparent;
		border: 1px solid rgb(255, 47, 2);
		color: rgb(255, 47, 2);

		&:hover {
			background-color: rgb(255, 47, 2);
			color: #fff;
		}
	}
</style>
