<script lang="ts">
	import TurndownService from 'turndown';
	import 'diff2html/bundles/css/diff2html.min.css';
	import Editor from '../Editor.svelte';

	export let data: { files: { path: string; meta: { title: string } }[] };

	let mainContent: string = '';
	let value: string = '';

	let oldText: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;

	let isDiffDisplayed: boolean = false;

	async function getFile(fileName: string): Promise<void> {
		try {
			const response = await fetch(`${fileName}`);
			const htmlContent = await response.text();

			// Parse the HTML string
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, 'text/html');

			// Extract the content inside <main> tag
			const mainElement: HTMLElement | null = doc.querySelector('main');
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
</script>

{#if value === ''}
	<h1>Select the file you want to edit</h1>

	<h2>From Mollify LMS</h2>
	<select on:change={(event) => getFile(event.currentTarget.value)}>
		<option value="">Select an option</option>
		{#each data.files as file}
			<option value={file.path}>{file.meta.title}</option>
		{/each}
	</select>
{/if}

{#if value !== ''}
	<Editor {oldText} {value} {diffHtml} {isPreviewDisplayed} {isDiffDisplayed} />
{/if}
