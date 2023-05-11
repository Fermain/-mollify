<script>
	import * as Diff from 'diff';

	const one =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.They are found on every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';
	const other =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight. They inhabit every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';

	const diff = Diff.diffWordsWithSpace(one, other);

	export let test = diff
		.map((part) => {
			const color = part.added ? '#97f295' : part.removed ? '#ffb6ba' : '#eee';
			const chunk = `<span style="background-color: ${color};">${part.value}</span>`;
			return chunk;
		})
		.join('');
</script>

<div class="demo pull-request">
	{@html test}
</div>

<style>
	div {
		border: 1px solid #ddd;
		padding: 2rem 1rem;
	}
</style>
