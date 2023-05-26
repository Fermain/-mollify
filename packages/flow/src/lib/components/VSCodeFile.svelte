<script lang="ts">
	import InkMde from 'ink-mde/svelte';
	import TurndownService from 'turndown';
	import * as Diff from 'diff';
	import { marked } from 'marked';
	import * as Diff2Html from 'diff2html';
	import 'diff2html/bundles/css/diff2html.min.css';

	export let data: { files: { path: string; meta: { title: string } }[] };

	let mainContent: string = '';
	let value: string = '';

	let oldText: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;
	let isDiffDisplayed: boolean = false;

	function displayPreview(): void {
		if (!isPreviewDisplayed) {
			isPreviewDisplayed = true;
		}
	}

	function displayDiff(): void {
		isDiffDisplayed = true;
		const textDiff = Diff.createTwoFilesPatch('file', 'file', oldText, value);

		const diffJson = Diff2Html.parse(textDiff);
		diffHtml = Diff2Html.html(diffJson, {
			drawFileList: true,
			matching: 'lines',
			outputFormat: 'side-by-side'
		});
	}

	async function getFile(fileName: string) {
		try {
			const response = await fetch(`${fileName}`);
			const htmlContent = await response.text();

			// Parse the HTML string
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, 'text/html');

			// Extract the content inside <main> tag
			mainContent = doc.querySelector('main').innerHTML;

			// Convert HTML content to Markdown
			const turndownService = new TurndownService();

			oldText = turndownService.turndown(mainContent);
			value = turndownService.turndown(mainContent);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h1>Select the file you want to edit</h1>

<h2>From Mollify LMS</h2>
<select on:change={(event) => getFile(event.target.value)}>
	{#each data.files as file}
		<option value={file.path}>{file.meta.title}</option>
	{/each}
</select>

{#if value !== ''}
	<div>
		<h1>Editor</h1>
		<div class="btn-wrapper">
			<a href="/#demo" class="primary-btn" on:click={displayPreview}>Preview file</a>
			<a href="/#diff" class="secondary-btn" on:click={displayDiff}>Display diff</a>
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
		<a href="/#demo" class="primary-btn" on:click={displayPreview}>Preview file</a>
		<a href="/#diff" class="secondary-btn" on:click={displayDiff}>Display diff</a>
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
