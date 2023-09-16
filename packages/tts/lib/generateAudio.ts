import fs from 'fs';
import path from 'path';
import transform from './transform';
import { fetchAudio } from './fetchAudio';

/**
 * Creates/updates audio file for a given slug
 * @param {string} content Content string to be converted to audio
 * @param {string} slug content slug to be used as filename
 * @param {string} filepath path to content file
 * @param {string} ELEVENLABS_API_KEY Your ElevenLabs API key
 * @param {boolean} replace If true, will replace existing audio file
 * @returns {string} URL to audio file
 */
export async function generateAudio(
  content: string,
  slug: string,
  filepath: string,
  ELEVENLABS_API_KEY: string,
  replace = false
) {
  const transformedContent = transform.all(content);

  const filePath = path.join('public', 'audio', `${slug}.mp3`);
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    if (!replace) {
      return JSON.stringify({ file: `${slug}.mp3`, url: `/audio/${slug}.mp3` });
    }
  }

  try {
    const response = await fetchAudio(transformedContent, ELEVENLABS_API_KEY);

    if (response.ok) {
      // Delete existing file if it already exists
      if (replace && fs.existsSync(filePath)) {
        console.log('file deleted');
        fs.unlinkSync(filePath);
      }
    } else {
      console.log('creation error', response.status);
      if (fs.existsSync(filePath)) {
        return JSON.stringify({
          error: 'Bad request, creation failed',
          url: `/audio/${slug}.mp3`,
          response,
        });
      }
      return JSON.stringify({
        error: 'Bad request, creation failed',
        url: `/audio/no_audio/no-audio.mp3`,
        response,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = slug;

    const audioDir = path.join('public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    await fs.promises.writeFile(
      path.join('public', 'audio', `${file}.mp3`),
      buffer
    );
    return JSON.stringify({ file: `${file}.mp3`, url: `/audio/${file}.mp3` });
  } catch (error: any) {
    console.error('Error generating audio:', error);
  }
}
