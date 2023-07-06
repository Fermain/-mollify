/**
 * Changes link markdown syntax to a TTS-friendly format.
 * @param input The string to be spoken by TTS
 * @example handleLinks('[Link](https://url.com/something)') // 'Link'
 */
export default function handleLinks(text: string): string {
    return text.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, (_match, p1, p2) => {
      return `${p1}`;
    });
  }
  