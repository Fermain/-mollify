<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { audio } from '$lib/stores/audio';

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
				audioSrc = data.url;
			})();
		}
	}
</script>

<div class="w-11/12">
	{#if audioSrc}
		<audio src={audioSrc} controls class="w-full h-full" />
	{/if}
</div>
