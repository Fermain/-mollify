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

	console.log(output);
</script>

{#if output}
	<div class="demo pull-request">
		<div>
			<h3>File name:</h3>
			<span class="old">{output.oldFileName}</span>
			<span>{output.newFileName}</span>
		</div>

		<div class="diff-wrapper">
			<h3>{output.oldHeader}</h3>
			<h3>{output.newHeader}</h3>
		</div>

		<div>
			{#each output.hunks as hunk}
				<h4>Old lines: {hunk.oldLines} New lines: {hunk.newLines}</h4>
				<div class="diff-wrapper">
					{#each hunk.lines as line}
						{#if !line.startsWith('\\')}
							{#if line.startsWith('+')}
								<span style="background-color: rgba(151, 242, 149, 0.5)">{line}</span>
							{:else}
								<span style="background-color: rgba(255, 182, 186, 0.5)">{line}</span>
							{/if}
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	div {
		border: 1px solid #ddd;
		padding: 2rem 1rem;
	}

	.old {
		text-decoration-line: line-through;
	}

	.diff-wrapper {
		display: flex;
	}
</style>
