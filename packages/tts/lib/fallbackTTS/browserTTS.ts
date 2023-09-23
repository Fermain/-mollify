/**
 * Generates audio content using browser-based Text-to-Speech (TTS) or a fallback option.
 * @param {string} content Content string to be converted to audio
 * @returns {Promise<string>} Audio content in base64 format
 */
export async function generateAudio(content: string): Promise<string> {
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
    // Fallback to browser-native TTS if browser-based TTS is unavailable
    const audioElement = document.createElement('audio');
    audioElement.src = ''; // Set the source to an empty string
    audioElement.textContent = content; // Set the text content
    document.body.appendChild(audioElement);

    return new Promise<string>((resolve, reject) => {
      audioElement.onended = () => {
        document.body.removeChild(audioElement);
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
      audioElement.onerror = error => {
        document.body.removeChild(audioElement);
        reject(error);
      };
      audioElement.play();
    });
  }
}
