/**
 * Changes link markdown syntax to a TTS-friendly format.
 * @param input The string to be spoken by TTS
 * @example handleLinks('[Link](https://url.com/something)') // 'Link (at url.com/something)'
 */
export default function handleLinks(text: string): string {
    return text.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, (_match, p1, p2) => {
      // Extract the domain from the URL
      const url = new URL(p2);
      const domain = url.hostname;
  
      // Extract the path from the URL
      const path = url.pathname;
  
      return `${p1} (at ${domain}${path})`;
    });
  }
  