<script lang="ts">
	import { afterUpdate } from 'svelte';
	import InkMde from 'ink-mde/svelte';
	import TurndownService from 'turndown';
	import { marked } from 'marked';
	import 'diff2html/bundles/css/diff2html.min.css';
	import '../../app.css';
	import { displayPreview } from '$lib/utils/displayPreview';
	import { displayDiff } from '$lib/utils/displayDiff';
	import { generateDiff } from '$lib/utils/generateDiff';
	import { styleCallouts } from '$lib/utils/styleCallouts';

	export let data: { files: { path: string; meta: { title: string } }[] };

	let mainContent: string = '';
	let value: string = '';

	let oldText: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;

	let isDiffDisplayed: boolean = false;

	async function getFile(fileName: string) {
		try {
			const response = await fetch(`${fileName}`);
			const htmlContent = await response.text();

			// Parse the HTML string
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, 'text/html');

			// Extract the content inside <main> tag
			const mainElement = doc.querySelector('main');
			if (mainElement) {
				mainContent = mainElement.innerHTML;

				// Convert HTML content to Markdown
				const turndownService = new TurndownService();

				oldText = turndownService.turndown(mainContent);
				value = turndownService.turndown(mainContent);
			}
		} catch (error) {
			console.error(error);
		}
	}

	afterUpdate(() => {
		styleCallouts();
	});
</script>

{#if value === ''}
	<h1>Select the file you want to edit</h1>

	<h2>From Mollify LMS</h2>
	<select on:change={(event) => getFile(event?.target?.value)}>
		<option value="">Select an option</option>
		{#each data.files as file}
			<option value={file.path}>{file.meta.title}</option>
		{/each}
	</select>
{/if}

{#if value !== ''}
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
			{@html marked(value)}
		</div>
	{/if}

	{#if isDiffDisplayed}
		<h2>File diff</h2>
		<div id="diff" class="demo">
			{@html diffHtml}
		</div>
	{/if}
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
