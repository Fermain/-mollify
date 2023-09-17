import { wordEmphasisEnabled } from '$lib/stores/wordEmphasis';
import { applyWordEmphasis } from './apply';
import { removeWordEmphasis } from './remove';

let wordEmphasis = false;
wordEmphasisEnabled.subscribe((prevValue) => (wordEmphasis = prevValue));

export function toggleWordEmphasis() {
  wordEmphasisEnabled.set(!wordEmphasis);
  wordEmphasisEnabled.update((value) => value);

  wordEmphasis ? applyWordEmphasis() : removeWordEmphasis();
}
