/**
 * Fetches audio from ElevenLabs API
 * @param {string} content Content string to be converted to audio
 * @param {string} ELEVENLABS_API_KEY Your ElevenLabs API key
 * @param {string} [VOICE_ID] Optional: Voice ID
 * @param {Object} [voice_settings] Optional: Voice settings
 * @param {number} [voice_settings.stability] Optional: Stability setting (default is 0)
 * @returns {Promise<Response>} Response object representing the audio file
 */
export async function fetchAudio(
  content: string,
  ELEVENLABS_API_KEY: string,
  VOICE_ID?: string,
  voice_settings?: { stability?: number }
): Promise<Response> {
  const defaultVoiceId = VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default value if not provided
  const defaultStability = voice_settings?.stability ?? 0; // Default stability setting if not provided

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${defaultVoiceId}`,
    {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: content,
        voice_settings: {
          stability: defaultStability,
          similarity_boost: 0, // You can provide a default value for this property as well if needed in the future!
        },
      }),
    }
  );

  return response;
}
