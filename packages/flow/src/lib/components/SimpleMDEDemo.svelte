<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let editor;

	onMount(async () => {
		const simpleMde = await import('SimpleMDE');
		const simpleEditor = simpleMde.default;
		editor = new simpleEditor({
			element: document.getElementById('simple-editor'),
			toolbar: [
				'heading',
				'bold',
				'italic',
				'strikethrough',
				'|',
				'horizontal-rule',
				'quote',
				'code',
				'|',
				'unordered-list',
				'ordered-list',
				'|',
				'table',
				'image',
				'link'
			],
			initialValue:
				'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.'
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.toTextArea();
		}
	});
</script>

<textarea id="simple-editor" />
