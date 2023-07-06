/**
 * Removes common markdown formatting syntax to make life easier for a tts software.
 * @param input The string to be spoken by TTS
 * @example markdown('**Bold** *Italic*') // 'Bold Italic'
 */
export default function handleMarkdown(text: string): string {
    // Remove bold and italic markdown syntax
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
  
    // Remove inline code markdown syntax
    text = text.replace(/`(.*?)`/g, '$1');
  
    // Remove image markdown syntax
    text = text.replace(/!\[(.*?)\]\(.*?\)/g, '$1');
  
    // Remove heading markdown syntax and add an ellipsis for extra pause time
    text = text.replace(/(#+)\s*(.*)/g, (_match, _p1, p2) => `${p2}...`);
  
    // Remove blockquote markdown syntax
    text = text.replace(/>\s*(.*)/g, '$1');
  
    // Remove list markdown syntax
    text = text.replace(/(\*|-)\s*(.*)/g, '$2');
  
    return text;
  }
  