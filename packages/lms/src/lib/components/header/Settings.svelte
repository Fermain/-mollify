<script lang="ts">
  import { LightSwitch, popup, SlideToggle, storePopup, toastStore } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import * as storage from '../../utils/storage/index';
  import { onMount } from 'svelte';
  import Icon from '../ui/Icon.svelte';
  import { wordEmphasisEnabled } from '$lib/stores/wordEmphasis';
  import { toggleWordEmphasis } from '$lib/utils/settings/wordEmphasis/toogle';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const settings: PopupSettings = {
    event: 'click',
    target: 'settings',
    placement: 'bottom'
  };

  // The 'tailwindFontSizes' don't work with the typography plugin. HTML elements that we controll will use 'tailwindFontSizes', and HTML we don't controll will use 'proseFontSizes'. Both arrays share sizes and indexes to facilitate shared localStorage code.
  const tailwindFontSizes: string[] = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
  const proseFontSizes: string[] = ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl', 'prose-2xl'];

  // Has to be done onMount because of how the font-size is set in the main HTML file
  onMount(() => {
    // Get the current index
    const container = document.querySelector('#container') as HTMLDivElement;
    const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;
    const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;

    // Get user's saved index
    const storedFontSize = Number(storage.load('fontSize'));

    // Apply the saved index
    const savedFontSizeClass = tailwindFontSizes[storedFontSize];
    const savedProseFontSizeClass = proseFontSizes[storedFontSize];
    container.classList.remove(tailwindFontSizes[currentIndex]);
    container.classList.add(savedFontSizeClass);

    if (savedProseFontSizeClass !== 'prose-base') {
      //The new classes aren't applied if 'prose' is still in the class list
      //proseContainer.classList.remove(proseFontSizes[currentIndex], 'prose');
      proseContainer.classList.add(savedProseFontSizeClass);
    } else {
      proseContainer.classList.remove(proseFontSizes[currentIndex]);
      proseContainer.classList.add(savedProseFontSizeClass);
    }
    container.setAttribute('data-font-size-index', storedFontSize.toString());
  });

  function increaseFontSize(): void {
    const container = document.querySelector('#container') as HTMLDivElement;
    const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

    const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
    const increasedFontSizeIndex = currentIndex + 1;

    if (increasedFontSizeIndex < tailwindFontSizes.length) {
      const increasedFontSizeClass = tailwindFontSizes[increasedFontSizeIndex];
      const increasedProseFontSizeClass = proseFontSizes[increasedFontSizeIndex];

      container.classList.remove(tailwindFontSizes[currentIndex]);
      container.classList.add(increasedFontSizeClass);

      //proseContainer.classList.remove('prose');
      proseContainer.classList.remove(proseFontSizes[currentIndex]);
      proseContainer.classList.add(increasedProseFontSizeClass);

      container.setAttribute('data-font-size-index', increasedFontSizeIndex.toString());
      storage.save('fontSize', increasedFontSizeIndex.toString());
    } else {
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
    const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

    const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
    const decreasedFontSizeIndex = currentIndex - 1;

    if (decreasedFontSizeIndex >= 0) {
      const decreasedFontSizeClass = tailwindFontSizes[decreasedFontSizeIndex];
      const decreasedProseFontSizeClass = proseFontSizes[decreasedFontSizeIndex];

      container.classList.remove(tailwindFontSizes[currentIndex]);
      container.classList.add(decreasedFontSizeClass);

      //proseContainer.classList.remove('prose');
      proseContainer.classList.remove(proseFontSizes[currentIndex]);
      proseContainer.classList.add(decreasedProseFontSizeClass);

      container.setAttribute('data-font-size-index', decreasedFontSizeIndex.toString());
      storage.save('fontSize', decreasedFontSizeIndex.toString());
    } else {
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
    const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

    const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;

    container.classList.remove(tailwindFontSizes[currentIndex]);
    container.classList.add('text-base');

    proseContainer.classList.remove(proseFontSizes[currentIndex]);
    proseContainer.classList.add('prose', 'prose-base');

    container.setAttribute('data-font-size-index', '1');
    storage.save('fontSize', '1');
    const userFeedback: ToastSettings = {
      message: 'Font size reset successfully',
      background: 'variant-filled-success',
      autohide: false
    };
    toastStore.trigger(userFeedback);
  }
</script>

<div>
  <button class="btn hover:bg-primary-hover-token" use:popup={settings}> <Icon name="settings" /></button>

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
        <button class="btn hover:bg-primary-hover-token p-1" on:click={increaseFontSize}>
          <Icon name="text_increase" /></button
        >
        <button class="btn hover:bg-primary-hover-token p-1" on:click={decreaseFontSize}>
          <Icon name="text_decrease" /></button
        >
        <button class="btn hover:bg-primary-hover-token p-1" on:click={resetFontSize}>
          <Icon name="refresh" /></button
        >
      </div>
    </div>
    <div class="flex justify-between my-5">
      <span class="p-1">Word emphasis</span>
      <div class="flex gap-4">
        <SlideToggle name="slide" size="sm" on:click={toggleWordEmphasis} checked={$wordEmphasisEnabled} />
      </div>
    </div>
  </div>
</div>
