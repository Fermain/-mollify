import { stopWords } from './stopWords';

export function removeStopWords(text: string) {
  return text
    .split(' ')
    .filter((word) => !stopWords.has(word.toLowerCase()))
    .join(' ');
}
