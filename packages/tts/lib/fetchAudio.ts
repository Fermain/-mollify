/**
 * Fetches audio from ElevenLabs API
 * @param content Content string to be converted to audio
 * @param ELEVENLABS_API_KEY Your ElevenLabs API key
 * @returns Audio file
 */
export async function fetchAudio(content: string, ELEVENLABS_API_KEY: string) {
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
    },
    body: JSON.stringify({
      text: content,
      voice_settings: {
        stability: 0,
        similarity_boost: 0,
      },
    }),
  });

  return response;
}
