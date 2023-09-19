import { save } from '$lib/utils/storage';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { toastStore } from '@skeletonlabs/skeleton';
import { tailwindFontSizes, proseFontSizes } from './constants';

export function increaseFontSize(): void {
  const container = document.querySelector('#container') as HTMLDivElement;
  const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

  const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
  const increasedFontSizeIndex = currentIndex + 1;

  if (increasedFontSizeIndex < tailwindFontSizes.length) {
    const increasedFontSizeClass = tailwindFontSizes[increasedFontSizeIndex];
    const increasedProseFontSizeClass = proseFontSizes[increasedFontSizeIndex];

    container.classList.remove(tailwindFontSizes[currentIndex]);
    container.classList.add(increasedFontSizeClass);

    proseContainer.classList.remove(proseFontSizes[currentIndex]);
    proseContainer.classList.add(increasedProseFontSizeClass);

    container.setAttribute('data-font-size-index', increasedFontSizeIndex.toString());
    save('fontSize', increasedFontSizeIndex.toString());
  } else {
    const userFeedback: ToastSettings = {
      message: 'Maximum font size reached.',
      background: 'variant-filled-warning',
      autohide: false
    };
    toastStore.trigger(userFeedback);
  }
}
