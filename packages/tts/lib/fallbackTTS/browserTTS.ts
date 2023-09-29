/**
 * Generates audio using the browser's built-in Text-to-Speech (TTS) engine as a fallback.
 * @param {string} content Content string to be converted to audio
 * @returns {Promise<string>} Audio content in base64 format
 */
export async function generateBrowserTTS(content: string): Promise<string> {
  if ('speechSynthesis' in window) {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(content);

    return new Promise<string>((resolve, reject) => {
      utterance.onend = () => {
        const audioBlob = new Blob([new Uint8Array(0)], { type: 'audio/mpeg' });
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = error => {
          reject(error);
        };

        reader.readAsDataURL(audioBlob);
      };
      utterance.onerror = error => {
        reject(error);
      };
      synthesis.speak(utterance);
    });
  } else {
    // Handle the case when browser-based TTS is not supported
    return Promise.reject('Browser-based TTS is not supported.');
  }
}
