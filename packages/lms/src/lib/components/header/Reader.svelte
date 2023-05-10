<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { audio } from '$lib/stores/audio';

	let audioSrc;
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
			const response = await fetch('/api/getCurrentPage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url: path })
			});
			const matter = await response.json();
			content = matter.content;
			slug = matter.slug.replaceAll(' ', '-').toLocaleLowerCase();
		});
	});

	$: {
		// Fetch the audio reactively whenever `content` changes
		if (content) {
			(async () => {
				const response = await fetch(`/api/tts`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ text: content, slug })
				});
				const data = await response.json();
				audio.set(data);
				console.log(data);
				audioSrc = data.url;
			})();
		}
	}
</script>

<div class="reader">
	{#if audioSrc}
		<audio src={audioSrc} controls class="reader-inner" />
	{/if}
</div>

<style>
	.reader {
		grid-area: reader;
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}

	.reader-inner {
		width: 100%;
		border-radius: var(--border-radius-xs);
		margin: 0 auto;
		height: 100%;
	}
</style>
