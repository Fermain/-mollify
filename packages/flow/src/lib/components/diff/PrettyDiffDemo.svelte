<script lang="ts">
	import prettydiff from 'prettydiff';
	import { onMount } from 'svelte';
	import AnsiToHtml from 'ansi-to-html';

	let output: string;

	const text1 =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.They are found on every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';
	const text2 =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight. They inhabit every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';

	const toHtml = new AnsiToHtml();

	onMount(() => {
		const options = prettydiff.options;
		options.source = text1;
		options.diff = text2;
		options.diff_view = 'sidebyside';
		output = prettydiff();
		output = toHtml.toHtml(output);
	});
</script>

<div>
	{@html output}
</div>
