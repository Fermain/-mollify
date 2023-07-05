<script lang="ts">
	import { onMount } from 'svelte';
	import Editor from '../Editor.svelte';
	import 'diff2html/bundles/css/diff2html.min.css';

	let apiCall: string = '/api/fetchRemote';
	let oldText: string = '';
	let value: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;

	let isDiffDisplayed: boolean = false;

	onMount(async () => {
		const response = await fetch(apiCall);
		const data: string = await response.text();
		oldText = data;
		value = data;
	});
</script>

<Editor {oldText} {value} {diffHtml} {isPreviewDisplayed} {isDiffDisplayed} />
