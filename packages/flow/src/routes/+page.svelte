<script lang="ts">
	import VsCodeFile from '$lib/components/VSCodeFile.svelte';
	import RemoteFile from '$lib/components/RemoteFile.svelte';
	import LocalFile from '$lib/components/LocalFile.svelte';

	export let data: { files: { path: string; meta: { title: string } }[] };

	let comesFromVSCode: boolean = false;
	let comesFromComputer: boolean = false;
	let comesFromRemote: boolean = false;

	function getFromVSCode(): void {
		comesFromVSCode = true;
	}

	function getFromComputer(): void {
		comesFromComputer = true;
	}

	function getFromRemote(): void {
		comesFromRemote = true;
	}

	function reset(): void {
		comesFromVSCode = false;
		comesFromComputer = false;
		comesFromRemote = false;
	}
</script>

<div>
	{#if !comesFromVSCode && !comesFromComputer && !comesFromRemote}
		<h1>Where do you want to get the file from?</h1>

		<button on:click={getFromVSCode}>VSCode</button>
		<button on:click={getFromComputer}>Your computer</button>
		<button on:click={getFromRemote}>Remote</button>
	{:else if comesFromVSCode}
		<VsCodeFile {data} />
		<button on:click={reset}>Choose another source</button>
	{:else if comesFromComputer}
		<LocalFile />
		<button on:click={reset}>Choose another source</button>
	{:else if comesFromRemote}
		<RemoteFile />
		<button on:click={reset}>Choose another source</button>
	{/if}
</div>
