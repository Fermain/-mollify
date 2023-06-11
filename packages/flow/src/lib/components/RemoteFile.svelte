<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import InkMde from 'ink-mde/svelte';
	import { marked } from 'marked';
	import 'diff2html/bundles/css/diff2html.min.css';
	import '../../app.css';
	import { displayPreview } from '$lib/utils/displayPreview';
	import { generateDiff } from '$lib/utils/generateDiff';
	import { displayDiff } from '$lib/utils/displayDiff';

	let apiCall: string = '/api/fetchRemote';
	let oldText: string = '';
	let value: string = '';

	let diffHtml: string = '';

	let isPreviewDisplayed: boolean = false;

	let isDiffDisplayed: boolean = false;

	onMount(async () => {
		const response = await fetch(apiCall);
		const data: string = await response.text();
		oldText = data;
		value = data;
	});

	afterUpdate(() => {
		const demo = document.querySelector('#demo');

		if (demo) {
			//Select all blockquotes and add the callout class
			const blockquotes = demo.querySelectorAll('blockquote');
			blockquotes.forEach((blockquote) => {
				blockquote.classList.add('callout');

				//if the blockquotes start with emojis, they're a callout, add the proper classes
				const secondChild = blockquote.childNodes[1] as HTMLElement;
				if (secondChild && isEmoji(secondChild.innerHTML)) {
					secondChild.classList.add('callout-title-text');

					//add specific classes to these emojis
					if (secondChild.innerHTML.startsWith('⚠')) {
						blockquote.style.borderLeft = '0.3rem solid #ffff2a';
					} else if (secondChild.innerHTML.startsWith('✅')) {
						blockquote.style.borderLeft = '0.3rem solid #01e701';
					} else if (secondChild.innerHTML.startsWith('⛔')) {
						blockquote.style.borderLeft = '0.3rem solid #ff2c2c';
					}
				}
			});
		}
	});

	//RegEx pattern comes from this blog article https://www.freecodecamp.org/news/how-to-use-regex-to-match-emoji-including-discord-emotes/
	function isEmoji(text: string) {
		const emojiRegex = /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu;
		return emojiRegex.test(text);
	}
</script>

<div>
	<h1>Editor</h1>
	<div class="btn-wrapper">
		<a
			href="/#demo"
			class="primary-btn"
			on:click={() => (isPreviewDisplayed = displayPreview(isPreviewDisplayed))}>Preview file</a
		>
		<a
			href="/#diff"
			class="secondary-btn"
			on:click={() => {
				diffHtml = generateDiff(oldText, value);
				isDiffDisplayed = displayDiff(isDiffDisplayed);
			}}>Display diff</a
		>
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
		<a
			href="/#demo"
			class="primary-btn"
			on:click={() => (isPreviewDisplayed = displayPreview(isPreviewDisplayed))}>Preview file</a
		>
		<a
			href="/#diff"
			class="secondary-btn"
			on:click={() => {
				diffHtml = generateDiff(oldText, value);
				isDiffDisplayed = displayDiff(isDiffDisplayed);
			}}>Display diff</a
		>
	</div>

	{#if isPreviewDisplayed}
		<h2>File preview</h2>
		<div id="demo" class="demo">
			{@html marked(value)}
		</div>
	{/if}

	{#if isDiffDisplayed}
		<h2>File diff</h2>
		<div id="diff" class="demo">
			{@html diffHtml}
		</div>
	{/if}
</div>

<style lang="scss">
	.btn-wrapper {
		margin: 3rem 0;
		display: flex;
		gap: 1rem;
	}

	.primary-btn,
	.secondary-btn {
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

	.secondary-btn {
		background-color: transparent;
		border: 1px solid rgb(255, 47, 2);
		color: rgb(255, 47, 2);

		&:hover {
			background-color: rgb(255, 47, 2);
			color: #fff;
		}
	}
</style>
