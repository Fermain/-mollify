import fs from 'fs';
import path from 'path';
import transform from './transform';
import { fetchAudio } from './fetchAudio';

/**
 * Checks if audio content needs regeneration based on content change
 * @param content New content
 * @param slug content slug to be used as filename
 * @returns true if audio needs to be regenerated, false otherwise
 */
function shouldRegenerateAudio(content: string, slug: string): boolean {
  const existingFilePath = path.join('public', 'audio', `${slug}.mp3`);

  if (!fs.existsSync(existingFilePath)) {
    // If the audio file doesn't exist, it needs to be generated
    return true;
  }

  // Read the existing audio content
  const existingContent = fs.readFileSync(existingFilePath, 'utf-8');

  // Compare the new content with the existing content
  return content !== existingContent;
}

export async function generateAudio(
  content: string,
  slug: string,
  filepath: string,
  ELEVENLABS_API_KEY: string,
  replace = false
): Promise<string> {
  if (!shouldRegenerateAudio(content, slug)) {
    // Content hasn't changed, use the existing audio
    return JSON.stringify({ file: `${slug}.mp3`, url: `/audio/${slug}.mp3` });
  }

  // Content has changed or the file doesn't exist, proceed with generation
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
        console.log('File deleted');
        fs.unlinkSync(filePath);
      }
    } else {
      console.log('Creation error', response.status);
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

    const audioDir = path.join('public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    await fs.promises.writeFile(filePath, buffer);

    return JSON.stringify({ file: `${slug}.mp3`, url: `/audio/${slug}.mp3` });
  } catch (error: any) {
    console.error('Error generating audio:', error);
    throw error; // Optionally re-throw the error for further handling
  }
}
