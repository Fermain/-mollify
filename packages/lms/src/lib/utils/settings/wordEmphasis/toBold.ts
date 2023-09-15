export function toBold(word: string): string {
  const wordSplit = word.split('');
  const toBold = Math.floor(word.length / 2);
  return `<b class='emphasis-added'>${wordSplit.slice(0, toBold).join('')}</b>${wordSplit
    .slice(toBold, word.length)
    .join('')} `;
}
