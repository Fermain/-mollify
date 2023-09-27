<script lang="ts">
  import { LightSwitch, popup, SlideToggle, storePopup } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import * as storage from '../../utils/storage/index';
  import { onMount } from 'svelte';
  import Icon from '../ui/Icon.svelte';
  import * as fontSize from '../../utils/settings/fontSize';
  import { wordEmphasisEnabled } from '$lib/stores/wordEmphasis';
  import { toggleWordEmphasis } from '$lib/utils/settings/wordEmphasis/toogle';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const settings: PopupSettings = {
    event: 'click',
    target: 'settings',
    placement: 'bottom'
  };

  // Has to be done onMount because of how the font-size is set in the main HTML file
  onMount(() => {
    // Get the current index
    const container = document.querySelector('#container') as HTMLDivElement;
    const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;
    const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;

    // Get user's saved index
    const storedFontSize = Number(storage.load('fontSize'));

    // Apply the saved index
    const savedFontSizeClass = fontSize.tailwindFontSizes[storedFontSize];
    const savedProseFontSizeClass = fontSize.proseFontSizes[storedFontSize];
    container.classList.remove(fontSize.tailwindFontSizes[currentIndex]);
    container.classList.add(savedFontSizeClass);

    if (savedProseFontSizeClass !== 'prose-base') {
      proseContainer.classList.add(savedProseFontSizeClass);
    } else {
      proseContainer.classList.remove(fontSize.proseFontSizes[currentIndex]);
      proseContainer.classList.add(savedProseFontSizeClass);
    }
    container.setAttribute('data-font-size-index', storedFontSize.toString());
  });
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
        <button class="btn hover:bg-primary-hover-token p-1" on:click={fontSize.increaseFontSize}>
          <Icon name="text_increase" /></button
        >
        <button class="btn hover:bg-primary-hover-token p-1" on:click={fontSize.decreaseFontSize}>
          <Icon name="text_decrease" /></button
        >
        <button class="btn hover:bg-primary-hover-token p-1" on:click={fontSize.resetFontSize}>
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
