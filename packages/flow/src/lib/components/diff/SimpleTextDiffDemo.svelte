<script lang="ts">
	import diff from 'simple-text-diff';
	import { onMount } from 'svelte';

	const oldText: string =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight. They are found on every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';

	const newText: string =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight. They inhabit every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';

	const { before, after } = diff.diffPatchBySeparator(oldText, newText, '.');

	onMount(() => {
		const delElements = document.querySelectorAll('del');
		for (const el of delElements) {
			el.style.backgroundColor = 'rgba(255, 182, 186, 0.5)';
		}

		const insElements = document.querySelectorAll('ins');
		for (const el of insElements) {
			el.style.backgroundColor = 'rgba(151, 242, 149, 0.5)';
		}
	});
</script>

<div class="demo">
	<div class="container">
		<h2>Before</h2>
		<div class="before">
			{@html before}
		</div>
	</div>
	<div class="container">
		<h2>After</h2>
		<div class="after">
			{@html after}
		</div>
	</div>
</div>

<style>
	.demo {
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
	}

	.container {
		border: 1px solid #eee;
		padding: 0.5rem;
	}
</style>
