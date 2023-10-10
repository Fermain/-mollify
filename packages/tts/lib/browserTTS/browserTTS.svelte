<!-- BrowserTTS.svelte -->

<script lang="ts">

import { generateAudio, fetchAudio, getAudio } from '../lib/fallbackTTS/browserTTS';

  /**
   * Generates audio content using browser-based Text-to-Speech (TTS) or a fallback option.
   * @param {string} content Content string to be converted to audio
   * @param {string} elevenLabsApiKey ElevenLabs API key (optional)
   * @returns {Promise<string>} Audio content in base64 format
   */
  export async function generateAudio(content: string, elevenLabsApiKey?: string): Promise<string> {
    // Check if an ElevenLabs API key is available
    if (elevenLabsApiKey) {
      // Attempt to generate audio using ElevenLabs
      try {
        const response = await fetchElevenLabsAudio(content, elevenLabsApiKey);
        if (response.ok) {
          const audioBlob = await response.blob();
          const audioDataUrl = await convertBlobToDataUrl(audioBlob);
          return audioDataUrl;
        } else {
          // Log the error if the response is not okay
          console.error(
            'ElevenLabs API request failed:',
            response.status,
            response.statusText
          );
          // Return a fallback value or throw an exception here if needed
        }
      } catch (error) {
        // Log and handle ElevenLabs API request error here
        console.error('Error while requesting audio from ElevenLabs:', error);
        // Return a fallback value or throw an exception here if needed
      }
    }

    // Fallback to browser-native TTS if ElevenLabs is unavailable or fails
    return generateBrowserTTS(content);
  }

  /**
   * Generates audio using the browser's built-in Text-to-Speech (TTS) engine.
   * @param {string} content Content string to be converted to audio
   * @returns {Promise<string>} Audio content in base64 format
   */
  async function generateBrowserTTS(content: string): Promise<string> {
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
          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(audioBlob);
        };
        utterance.onerror = (error) => {
          reject(error);
        };
        synthesis.speak(utterance);
      });
    } else {
      // Handle the case when browser-based TTS is not supported!
      return Promise.reject('Browser-based TTS is not supported.');
    }
  }

  /**
   * Fetches audio using ElevenLabs API.
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

  /**
   * Converts a Blob to a data URL.
   * @param {Blob} blob Blob to be converted
   * @returns {Promise<string>} Data URL representing the Blob's contents
   */
  async function convertBlobToDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    });
  }
</script>

<div>
  <!-- Component HTML structure here -->
</div>

<style>
  /* Component CSS styles here */
</style>
