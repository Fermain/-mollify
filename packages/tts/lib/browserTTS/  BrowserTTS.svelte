<!-- 📢 BrowserTTS.svelte -->

<script lang="ts">
    // Import necessary functions and modules
    import { generateAudio } from '../generateAudio';
    import { generateBrowserTTS } from "./  generateBrowserTTS"
    import { fetchElevenLabsAudio } from './fetchElevenLabsAudio';
    import { convertBlobToDataUrl } from './convertBlobToDataUrl';
  
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
  </script>
  
  <div>
    <p>This is a placeholder for content in the BrowserTTS component.</p>
  </div>
  
  <style>
    /* Component CSS styles here */
    div {
      background-color: #f0f0f0;
      padding: 10px;
      border: 1px solid #ccc;
    }
  
    p {
      font-size: 16px;
      color: #333;
    }
  </style>
  