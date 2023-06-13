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
				// Extract the title
				const titleElement: HTMLElement | null = mainElement.querySelector('h1');
				const title = titleElement ? titleElement.textContent : '';

				// Extract the tags
				const tagsElement: HTMLElement | null = mainElement.querySelectorAll('.tag');

				const frontmatter = `---
title: ${title}
tags:
${Array.from(tagsElement)
	.map((tag) => `- ${tag.textContent}`)
	.join('\n')}
---`;

				// Create an instance of TurndownService
				const turndownService = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });

				// Convert the main content to Markdown
				mainContent = turndownService.turndown(mainElement.innerHTML);

				// Update the value and oldText with the frontmatter and converted markdown content
				oldText = `${frontmatter}\n\n${mainContent}`;
				value = `${frontmatter}\n\n${mainContent}`;
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
