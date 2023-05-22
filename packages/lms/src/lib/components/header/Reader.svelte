<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { audio } from '$lib/stores/audio';
	import { fetchAudio } from '$lib/utils/tts/fetchAudio';
	import { createAudio } from '$lib/utils/tts/createAudio';

	let hasAudio = false;
	let isContent = false;
	let audioSrc: string | null = null;
	let path = '';
	let content = '';
	let slug = '';
	function updatePath() {
		path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
	}

	onMount(async () => {
		updatePath();

		page.subscribe(async (data) => {
			updatePath();
			audioSrc = null;
			content = '';
			slug = '';
			isContent = false;
			const response = await fetch('/api/getCurrentPage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url: path })
			});
			const matter = await response.json();
			if (matter.content) {
				content = matter.content;
				slug = matter.slug.replaceAll(' ', '-').toLocaleLowerCase();
				isContent = true;
			}
		});
	});

	$: {
		// Fetch the audio reactively whenever `content` changes
		if (content) {
			(async () => {
				const data = await fetchAudio(slug);
				audio.set(data);
				if (data.exists) {
					hasAudio = true;
				} else {
					hasAudio = false;
				}
				audioSrc = data.url;
			})();
		}
	}

	async function regenerateAudio() {
		const filepath = path;
		const data = await createAudio(content, slug, filepath, true);
		audio.set(data);
		if (data.exists) {
			hasAudio = true;
		} else {
			hasAudio = false;
		}
		audio.set(data);
		audioSrc = data.url;
	}

	let isOpen = true;
	function toggleSettings() {
		isOpen = !isOpen;
	}

	let scream: HTMLAudioElement;
	function playAudio() {
		scream.play();
	}
</script>

<div class="reader">
	<div class="reader-settings">
		<i class="icon-f reader-settings" role="button" on:click={toggleSettings}>Settings</i>
		{#if isOpen}
			<div class="settings-options">
				{#if hasAudio}
					<button on:click={regenerateAudio}>Regenerate Audio File</button>
				{/if}
				{#if !hasAudio && isContent}
					<button on:click={regenerateAudio}>Create Audio</button>
				{/if}
				<button on:click={playAudio}>Scream For Help!</button>
				<audio bind:this={scream}>
					<source src="/public/audio/silly_stuff/female_scream.wav" type="audio/wav" />
					Your browser does not support the audio element.
				</audio>
			</div>
		{/if}
	</div>

	{#if audioSrc}
		<audio src={audioSrc} controls class="reader-inner" />
	{/if}
</div>

<style>
	.reader-settings {
		padding: 0.25rem;
		color: azure;
		width: fit-content;
		position: relative;
	}

	.settings-options {
		position: absolute;
		background-color: var(--primary);
		color: var(--text-secondary);
		padding: var(--spacing-m);
		border-radius: var(--spacing-m);
		left: 50%;
		bottom: 100%;
		border: 1px solid var(--secondary);
	}

	.settings-options button {
		display: block;
		width: 100%;
		padding: var(--spacing-s);
		border-radius: var(--spacing-s);
		background-color: var(--secondary);
		color: var(--text-primary);
		margin-bottom: var(--spacing-s);
		border: none;
	}
	.reader {
		grid-area: reader;
		width: 100%;
		margin: 0 auto;
		text-align: center;
		display: flex;
	}

	.reader-inner {
		width: 100%;
		border-radius: var(--border-radius-xs);
		margin: 0 auto;
		height: 100%;
	}
</style>
