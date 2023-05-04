<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let textarea: HTMLTextAreaElement;
	let editor: EasyMDE;

	onMount(async () => {
		const easymde = await import('easymde');
		const EasyMDE = easymde.default;
		editor = new EasyMDE({
			element: textarea,
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
