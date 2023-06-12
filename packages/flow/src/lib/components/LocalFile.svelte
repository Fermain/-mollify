<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChangeEvent } from 'react';
	import 'diff2html/bundles/css/diff2html.min.css';
	import Editor from './Editor.svelte';

	let fileContent: string = '';
	let oldText: string = '';
	let value: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;

	let isDiffDisplayed: boolean = false;

	//reads the contents of the chosen file
	function readFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsText(file);
		});
	}

	onMount(async () => {
		//this element allows the user to pick a file from their local computer
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		fileInput.addEventListener('change', async (event: ChangeEvent<HTMLInputElement>) => {
			if (event && event.currentTarget) {
				const files = event.currentTarget.files;
				//check if some files are selected
				if (files && files.length > 0) {
					const file = files[0];
					//reads the content of the file using the previous function
					fileContent = await readFile(file);
					oldText = fileContent;
					value = fileContent;
				}
			}
		});
	});
</script>

<input type="file" id="fileInput" accept=".txt,.md" />
<Editor {oldText} {value} {diffHtml} {isPreviewDisplayed} {isDiffDisplayed} />
