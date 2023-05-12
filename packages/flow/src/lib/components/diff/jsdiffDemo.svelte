<!-- <script lang="ts">
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
</style> -->

<script lang="ts">
	import * as Diff from 'diff';
	import { onMount } from 'svelte';

	const one =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.They are found on every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';
	const other =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight. They inhabit every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons. Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).';

	let output: {
		oldFileName: string | undefined;
		newFileName: string | undefined;
		oldHeader: string | undefined;
		newHeader: string | undefined;
		hunks: {
			oldStart: number;
			oldLines: number;
			newStart: number;
			newLines: number;
			lines: {
				content: string;
				color: string;
			}[];
		}[];
	} = {
		oldFileName: undefined,
		newFileName: undefined,
		oldHeader: undefined,
		newHeader: undefined,
		hunks: []
	};

	const options = {
		context: 10,
		ignoreWhiteSpace: true,
		newlineIsToken: true
	};

	onMount(() => {
		output = Diff.structuredPatch(
			'file.txt',
			'file.md',
			one,
			other,
			'Fascinating Facts About Owls',
			'Discover the Fascinating World of Owls',
			options
		);
	});
</script>

{#if output}
	<div class="demo">
		<div>
			<h3>File name:</h3>
			<span class="old">{output.oldFileName}</span>
			<span>{output.newFileName}</span>
		</div>

		<div>
			{#each output.hunks as hunk}
				<h4>Old lines: {hunk.oldLines} New lines: {hunk.newLines}</h4>
				<div class="diff-wrapper">
					{#each hunk.lines as line}
						{#if !line.startsWith('\\')}
							{#if line.startsWith('+')}
								<span class="old-text">{line}</span>
							{:else}
								<span class="new-text">{line}</span>
							{/if}
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.demo {
		border: 1px solid #ddd;
		padding: 2rem 1rem;
	}

	.old {
		text-decoration-line: line-through;
	}

	.old-text {
		background-color: rgba(151, 242, 149, 0.5);
	}

	.new-text {
		background-color: rgba(255, 182, 186, 0.5);
	}

	.diff-wrapper {
		display: flex;
	}
</style>
