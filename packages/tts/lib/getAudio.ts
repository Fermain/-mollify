import fs from 'fs';
import path from 'path';

/**
 * Gets audio file for a given slug
 * @param slug content slug to be used as filename
 * @returns {Object} Response object with file information
 */
export async function getAudio(slug: string) {
  const filePath = path.join('public', 'audio', `${slug}.mp3`);

  if (fs.existsSync(filePath)) {
    return {
      success: true,
      file: `${slug}.mp3`,
      url: `/audio/${slug}.mp3`,
      exists: true,
    };
  } else {
    return {
      success: false,
      error: 'File Not Found',
      url: `/audio/no_audio/no-audio.mp3`,
      exists: false,
    };
  }
}
