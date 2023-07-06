<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { audio } from '$lib/stores/audio';
	import { fetchAudio } from '$lib/utils/tts/fetchAudio';
	import { createAudio } from '$lib/utils/tts/createAudio';
	import { popup, toastStore } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let hasAudio = false;
	let isContent = false;
	let audioSrc: string | null = null;
	let path = '';
	let content = '';
	let slug = '';
	let isloading = false;
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
			//if path begins with /content, then it is a content page so fetch the content
			if (path.startsWith('/content')) {
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

	const audioSettings: PopupSettings = {
		event: 'click',
		target: 'audioSettings',
		placement: 'top'
	};

	// Regenerate/create the audio file for the current page content
	async function regenerateAudio() {
		isloading = true;

		if (isloading) {
			const userFeedback: ToastSettings = {
				message: 'Creating Audio File...',
				background: 'variant-filled-warning',
				autohide: true,
			};
			toastStore.trigger(userFeedback);
		}

		const filepath = path;
		const data = await createAudio(content, slug, filepath, hasAudio);
		audio.set(data);
		audioSrc = data.url;
		isloading = false;
		if (data.error) {
			const userFeedback: ToastSettings = {
				message: data.error,
				background: 'variant-filled-error',
				autohide: true,
			};
			toastStore.trigger(userFeedback);
		} else {
			const userFeedback: ToastSettings = {
				message: 'Success! Audio file created.',
				background: 'variant-filled-success',
				autohide: true,
			};
			hasAudio = true;
			toastStore.trigger(userFeedback);
		}
	}

	// For my frustration and amusement
	let scream: HTMLAudioElement;
	function playAudio() {
		scream.play();
	}

	let horse: HTMLAudioElement;
	function playHorseAudio() {
		horse.play();
	}
</script>

<div class="flex w-full justify-between items-center">
	{#if path.startsWith('/content')}
		<div>
			<button class="btn hover:bg-primary-hover-token" use:popup={audioSettings}>
				<i class="icon-f">settings</i></button
			>
			<div class="card p-4 w-60 shadow-xl" data-popup="audioSettings" id="settings-card">
				<h3 class="h3 mb-3">Audio Settings</h3>
				<hr />
				{#if hasAudio && !isloading}
					<button on:click={regenerateAudio} class="my-5 btn hover:bg-primary-hover-token p-1"
						>Regenerate Audio File</button
					>
				{/if}
				{#if !hasAudio && isContent}
					<button on:click={regenerateAudio} class="my-5 btn hover:bg-primary-hover-token p-1">Create Audio</button>
				{/if}
				<button on:click={playAudio} class="my-5 btn hover:bg-primary-hover-token p-1">Scream For Help!</button>
				<audio bind:this={scream}>
					<source src="/public/audio/silly_stuff/female_scream.wav" type="audio/wav" />
					Your browser does not support the audio element.
				</audio>
				<button on:click={playHorseAudio} class="my-5 btn hover:bg-primary-hover-token p-1">Horsing Around</button>
				<audio bind:this={horse}>
					<source src="/public/audio/silly_stuff/horse-neigh.mp3" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</div>
		</div>
	{/if}
	{#if audioSrc}
		<audio src={audioSrc} controls class="w-full" />
	{/if}
</div>

<style>
	audio {
		height: 1.8rem;
		margin-right: 1rem;
	}
</style>
