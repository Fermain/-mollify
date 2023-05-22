<script lang="ts">
	import { LightSwitch, popup, storePopup, toastStore } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import * as storage from '../../utils/storage/index';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const settings: PopupSettings = {
		event: 'click',
		target: 'settings',
		placement: 'bottom'
	};

	const tailwindFontSizes: string[] = [
		'text-xs',
		'text-sm',
		'text-base',
		'text-lg',
		'text-xl',
		'text-2xl',
		'text-3xl',
		'text-4xl',
		'text-5xl'
	];

	// Has to be done onMount because of how the font-size is set in the main HTML file
	onMount(() => {
		// Get the current index
		const container = document.querySelector('#container') as HTMLDivElement;
		const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;

		// Get user's saved index
		const storedFontSize = Number(storage.load('fontSize'));

		// Apply the saved index
		const savedFontSizeClass = tailwindFontSizes[storedFontSize];
		container.classList.remove(tailwindFontSizes[currentIndex]);
		container.classList.add(savedFontSizeClass);
		container.setAttribute('data-font-size-index', storedFontSize.toString());
	});

	function increaseFontSize(): void {
		const container = document.querySelector('#container') as HTMLDivElement;

		const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
		const increasedFontSizeIndex = currentIndex + 1;

		if (increasedFontSizeIndex < tailwindFontSizes.length) {
			const increasedFontSizeClass = tailwindFontSizes[increasedFontSizeIndex];
			container.classList.remove(tailwindFontSizes[currentIndex]);
			container.classList.add(increasedFontSizeClass);
			container.setAttribute('data-font-size-index', increasedFontSizeIndex.toString());
			storage.save('fontSize', increasedFontSizeIndex.toString());
		} else {
			console.log('Maximum font size reached.');
			const userFeedback: ToastSettings = {
				message: 'Maximum font size reached.',
				background: 'variant-filled-warning',
				autohide: false
			};
			toastStore.trigger(userFeedback);
		}
	}

	function decreaseFontSize(): void {
		const container = document.querySelector('#container') as HTMLDivElement;

		const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
		const decreasedFontSizeIndex = currentIndex - 1;

		if (decreasedFontSizeIndex >= 0) {
			const increasedFontSizeClass = tailwindFontSizes[decreasedFontSizeIndex];
			container.classList.remove(tailwindFontSizes[currentIndex]);
			container.classList.add(increasedFontSizeClass);
			container.setAttribute('data-font-size-index', decreasedFontSizeIndex.toString());
			storage.save('fontSize', decreasedFontSizeIndex.toString());
		} else {
			console.log('Minimum font size reached.');
			const userFeedback: ToastSettings = {
				message: 'Minimum font size reached.',
				background: 'variant-filled-warning',
				autohide: false
			};
			toastStore.trigger(userFeedback);
		}
	}

	function resetFontSize(): void {
		const container = document.querySelector('#container') as HTMLDivElement;
		const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
		container.classList.remove(tailwindFontSizes[currentIndex]);
		container.classList.add('text-base');
		container.setAttribute('data-font-size-index', '2');
		storage.save('fontSize', '2');
		const userFeedback: ToastSettings = {
			message: 'Font size reset successfully',
			background: 'variant-filled-success',
			autohide: false
		};
		toastStore.trigger(userFeedback);
	}
</script>

<div>
	<button class="btn hover:bg-primary-hover-token" use:popup={settings}> <i class="icon-f">settings</i></button>

	<div class="card p-4 w-60 shadow-xl" data-popup="settings" id="settings-card">
		<h3 class="h3 mb-3">Settings</h3>
		<hr />
		<div class="flex justify-between my-5">
			<span>Theme</span>
			<LightSwitch />
		</div>
		<div class="flex justify-between my-5">
			<span class="p-1">Text</span>
			<div class="flex gap-4">
				<button class="btn hover:bg-primary-hover-token p-1" on:click={increaseFontSize}
					><i class="icon-f">text_increase</i></button
				>
				<button class="btn hover:bg-primary-hover-token p-1" on:click={decreaseFontSize}
					><i class="icon-f">text_decrease</i></button
				>
				<button class="btn hover:bg-primary-hover-token p-1" on:click={resetFontSize}>
					<i class="icon-f">refresh</i></button
				>
			</div>
		</div>
	</div>
</div>
