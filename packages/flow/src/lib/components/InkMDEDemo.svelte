<!-- <script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import InkMde from 'ink-mde/svelte';
	import diff from 'simple-text-diff';
	import { marked } from 'marked';

	let apiCall: string = '/api/fetchRemote';
	let oldText: string = '';
	let value: string = '';

	let beforeText = '';
	let afterText = '';

	onMount(async () => {
		const response = await fetch(apiCall);
		const data: string = await response.text();
		oldText = data;
		value = data;
	});

	function displayContents(): void {
		const { before, after } = diff.diffPatch(oldText, value);
		beforeText = marked(before);
		afterText = marked(after);
	}

	afterUpdate(() => {
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

<div>
	<h1>Editor</h1>
	<div class="btn-wrapper">
		<a href="/#demo" class="primary-btn" on:click={displayContents}>Compare changes</a>
	</div>
	<InkMde
		bind:value
		options={{
			interface: {
				appearance: 'light',
				toolbar: true
			},
			readability: true,
			toolbar: {
				bold: true,
				code: true,
				codeBlock: true,
				heading: true,
				image: true,
				italic: true,
				link: true,
				list: true,
				orderedList: true,
				quote: true,
				taskList: true,
				upload: true
			}
		}}
	/>
	<div class="btn-wrapper">
		<a href="/#demo" class="primary-btn" on:click={displayContents}>Compare changes</a>
	</div>

	{#if beforeText !== ''}
		<h2>File comparison</h2>
		<div id="demo" class="demo">
			<div class="container">
				{@html beforeText}
			</div>
			<div class="container">
				{@html afterText}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.btn-wrapper {
		margin: 3rem 0;
	}

	.primary-btn {
		background-color: rgb(255, 47, 2);
		color: white;
		border: none;
		text-decoration: none;
		padding: 0.5rem 1rem;
		font-size: 16px;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			opacity: 0.9;
		}
	}

	.demo {
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
	}

	.container {
		border: 1px solid #eee;
		padding: 0.5rem;
		flex: 0 0 45%;
	}
</style> -->

<script lang="ts">
	import * as Diff from 'diff';
	import InkMde from 'ink-mde/svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { marked } from 'marked';

	let apiCall: string = '/api/fetchRemote';
	let oldText: string = '';
	let value: string = '';

	let differences: {
		added?: boolean;
		removed?: boolean;
		value: string;
	}[] = [];

	const options = {
		context: 10,
		ignoreWhiteSpace: true,
		newlineIsToken: true
	};

	onMount(async () => {
		const response = await fetch(apiCall);
		const data: string = await response.text();
		oldText = data;
		value = data;
	});

	function displayContents(): void {
		const diffResult = Diff.diffSentences(oldText, value, options);
		differences = diffResult;

		console.log(diffResult);
	}

	function formatMarkdown(text: string): string {
		return marked(text);
	}
</script>

<div>
	<h1>Editor</h1>
	<div class="btn-wrapper">
		<a href="/#demo" class="primary-btn" on:click={displayContents}>Compare changes</a>
	</div>
	<InkMde
		bind:value
		options={{
			interface: {
				appearance: 'light',
				toolbar: true
			},
			readability: true,
			toolbar: {
				bold: true,
				code: true,
				codeBlock: true,
				heading: true,
				image: true,
				italic: true,
				link: true,
				list: true,
				orderedList: true,
				quote: true,
				taskList: true,
				upload: true
			}
		}}
	/>
	<div class="btn-wrapper">
		<a href="/#demo" class="primary-btn" on:click={displayContents}>Compare changes</a>
	</div>
	{#if differences.length > 0}
		<div class="demo pull-request">
			{#each differences as diff (diff.value)}
				{#if diff.added}
					<div>
						<p class="added">{@html formatMarkdown(diff.value)}</p>
					</div>
				{:else if diff.removed}
					<div>
						<p class="removed">{@html formatMarkdown(diff.value)}</p>
					</div>
				{:else}
					<p>{@html formatMarkdown(diff.value)}</p>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.demo {
		border: 1px solid #ddd;
		padding: 2rem 1rem;
		display: flex;
	}
	.added {
		color: green;
	}
	.removed {
		color: red;
	}
</style>
