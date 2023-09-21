import { save } from '$lib/utils/storage';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { toastStore } from '@skeletonlabs/skeleton';
import { tailwindFontSizes, proseFontSizes } from './constants';

export function resetFontSize(): void {
  const container = document.querySelector('#container') as HTMLDivElement;
  const proseContainer = document.querySelector('#prose-container') as HTMLDivElement;

  const currentIndex = parseInt(container.getAttribute('data-font-size-index') as string, 10) || 0;

  container.classList.remove(tailwindFontSizes[currentIndex]);
  container.classList.add('text-base');

  proseContainer.classList.remove(proseFontSizes[currentIndex]);
  proseContainer.classList.add('prose', 'prose-base');

  container.setAttribute('data-font-size-index', '1');
  save('fontSize', '1');
  const userFeedback: ToastSettings = {
    message: 'Font size reset successfully',
    background: 'variant-filled-success',
    autohide: false
  };
  toastStore.trigger(userFeedback);
}
