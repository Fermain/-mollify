import { save } from '$lib/utils/storage';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { toastStore } from '@skeletonlabs/skeleton';
import { tailwindFontSizes, proseFontSizes } from './constants';

export function decreaseFontSize(): void {
  const container = document.querySelector('#container') as HTMLDivElement;
  const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

  const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;
  const decreasedFontSizeIndex = currentIndex - 1;

  if (decreasedFontSizeIndex >= 0) {
    const decreasedFontSizeClass = tailwindFontSizes[decreasedFontSizeIndex];
    const decreasedProseFontSizeClass = proseFontSizes[decreasedFontSizeIndex];

    container.classList.remove(tailwindFontSizes[currentIndex]);
    container.classList.add(decreasedFontSizeClass);

    proseContainer.classList.remove(proseFontSizes[currentIndex]);
    proseContainer.classList.add(decreasedProseFontSizeClass);

    container.setAttribute('data-font-size-index', decreasedFontSizeIndex.toString());
    save('fontSize', decreasedFontSizeIndex.toString());
  } else {
    const userFeedback: ToastSettings = {
      message: 'Minimum font size reached.',
      background: 'variant-filled-warning',
      autohide: false
    };
    toastStore.trigger(userFeedback);
  }
}
