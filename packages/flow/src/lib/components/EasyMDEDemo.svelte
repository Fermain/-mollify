<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createTask, createCodeBlock } from '../../utils/easymdeCustomFunctions';

	let textarea: HTMLTextAreaElement;
	let editor: EasyMDE;

	onMount(async () => {
		const easymde = await import('easymde');
		const EasyMDE = easymde.default;
		editor = new EasyMDE({
			element: textarea,
			toolbar: [
				{
					name: 'h1',
					action: EasyMDE.toggleHeading1,
					text: 'H1',
					title: 'Heading 1'
				},
				{
					name: 'h2',
					action: EasyMDE.toggleHeading2,
					text: 'H2',
					title: 'Heading 2'
				},
				{
					name: 'h3',
					action: EasyMDE.toggleHeading3,
					text: 'H3',
					title: 'Heading 3'
				},
				{
					name: 'h4',
					action: EasyMDE.toggleHeading4,
					text: 'H4',
					title: 'Heading 4'
				},
				{
					name: 'h5',
					action: EasyMDE.toggleHeading5,
					text: 'H5',
					title: 'Heading 5'
				},
				{
					name: 'h6',
					action: EasyMDE.toggleHeading6,
					text: 'H6',
					title: 'Heading 6'
				},
				'bold',
				'italic',
				'strikethrough',
				'|',
				'horizontal-rule',
				'quote',
				'|',
				'unordered-list',
				'ordered-list',
				{
					name: 'task',
					action: (editor) => {
						createTask(editor);
					},
					className: 'fa fa-check-square',
					title: 'Task',
					attributes: {
						// for custom attributes
						id: 'task',
						'data-value': 'custom value' // HTML5 data-* attributes need to be enclosed in quotation marks ("") because of the dash (-) in its name.
					}
				},
				'|',
				'table',
				'image',
				'link',
				'|',
				'code',
				{
					name: 'codeBlock',
					action: (editor) => {
						createCodeBlock(editor);
					},
					text: 'CB',
					title: 'codeBlock',
					attributes: {
						// for custom attributes
						id: 'codeBlock',
						'data-value': 'custom value' // HTML5 data-* attributes need to be enclosed in quotation marks ("") because of the dash (-) in its name.
					}
				}
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

<textarea id="editor" />
