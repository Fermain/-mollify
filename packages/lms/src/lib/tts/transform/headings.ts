/**
 * Removes # heading markdown syntax and adds an ellipsis to the end of the string for extra pause time.
 * @param input The string to be spoken by TTS
 * @example headings('# Example') // 'Example...'
 */
export default function headings(text: string): string {
  const pattern = /(#+)\s*(.*)/g;
  const replacement = (_match: string, _p1: string, p2: string) => `${p2}...`;
  return text.replace(pattern, replacement);
}
