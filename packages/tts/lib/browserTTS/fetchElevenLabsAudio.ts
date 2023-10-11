// 🌐 packages/tts/lib/browserTTS/fetchElevenLabsAudio.ts


/**
 * Fetches audio using ElevenLabs API. 🎵
 * @param {string} content Content string to be converted to audio
 * @param {string} apiKey ElevenLabs API key
 * @returns {Promise<Response>} Response object representing the audio file
 */
async function fetchElevenLabsAudio(content: string, apiKey: string): Promise<Response> {
    const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
  
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          accept: 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: content,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        }),
      }
    );
  
    return response;
  }
  
  export { fetchElevenLabsAudio };
  