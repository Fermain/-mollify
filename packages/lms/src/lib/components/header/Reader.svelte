<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { EntityMeta } from '@mollify/types';
	import { audio } from '$lib/stores/audio';

	let institutes: EntityMeta[] | null = [];
	let current: EntityMeta | undefined;
	let isCourse = false;
	let pathArray: string[] = [];
	let currentPath: string;

	let audioSrc;
	let parsedText;

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
			const data = await response.json();
			files.set(data);
		}

		if ($audio === null) {
			const response = await fetch(`/api/tts/${currentPath}`);
			const data = await response.json();
			audio.set(data);
		}
	});

	function updatePath() {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
	}

	if (browser) {
		updatePath();
		current = getCurrent(institutes, pathArray, false);
	}

	$: {
		if ($files) {
			institutes = $files;
			current = getCurrent(institutes, pathArray, false);
		}
		page.subscribe((data) => {
			updatePath();
		});
		isCourse = current?.type === 'course';

		// Fetch the audio reactively whenever `currentPath` changes
		if (currentPath && $audio === null) {
			currentPath = decodeURIComponent(currentPath);
			(async () => {
				const response = await fetch(`/api/tts/${currentPath}`);
				const data = await response.json();
				audio.set(data);
				console.log(data);
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
