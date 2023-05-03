<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	//starts copy
	let textarea: HTMLTextAreaElement;
	let editor: EasyMDE;
	// Setting up the editor and the visible buttons of the toolbar
	onMount(async () => {
		const easymde = await import('easymde');
		const EasyMDE = easymde.default;
		editor = new EasyMDE({
			element: textarea,
			initialValue:
				'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.'
		});
	});

	// Resetting the editor when clearing it
	onDestroy(() => {
		if (editor) {
			editor.toTextArea();
		}
	});
</script>

<textarea id="editor" />
