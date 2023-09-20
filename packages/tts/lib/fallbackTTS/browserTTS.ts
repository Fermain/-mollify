/**
 * Generates audio using browser-based Text-to-Speech (TTS) or a fallback option.
 * @param {string} content Content string to be converted to audio
 * @returns {Promise<string>} URL to the generated audio
 */
export async function generateAudio(content: string): Promise<string> {
  if ('speechSynthesis' in window) {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(content);

    return new Promise<string>((resolve, reject) => {
      utterance.onend = () => {
        const audioBlob = new Blob([new Uint8Array(0)], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve(audioUrl);
      };
      utterance.onerror = error => {
        reject(error);
      };
      synthesis.speak(utterance);
    });
  } else {
    // Fallback to browser-native TTS if browser-based TTS is unavailable
    const audioElement = document.createElement('audio');
    audioElement.src = ''; // Set the source to an empty string
    audioElement.textContent = content; // Set the text content
    document.body.appendChild(audioElement);

    return new Promise<string>((resolve, reject) => {
      audioElement.onended = () => {
        document.body.removeChild(audioElement);
        resolve(audioElement.src);
      };
      audioElement.onerror = error => {
        document.body.removeChild(audioElement);
        reject(error);
      };
      audioElement.play();
    });
  }
}
