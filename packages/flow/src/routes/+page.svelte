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
</script>

<div>
	<h1>Where do you want to get the file from?</h1>

	<button on:click={getFromVSCode}>VSCode</button>
	<button on:click={getFromComputer}>Your computer</button>
	<button on:click={getFromRemote}>Remote</button>

	{#if comesFromVSCode}
		<VsCodeFile {data} />
	{:else if comesFromComputer}
		<LocalFile />
	{:else if comesFromRemote}
		<RemoteFile />
	{/if}
</div>
