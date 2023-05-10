import { ELEVENLABS_API_KEY } from '$env/static/private';
import fs from 'fs';
import path from 'path';

export async function generateAudio(content: string, slug: string) {
	const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
	const filePath = path.join('public', 'audio', `${slug}.mp3`);
	console.log('filePath', filePath);
	// Check if file already exists
	if (fs.existsSync(filePath)) {
		console.log('File already exists', filePath);
		return JSON.stringify({ file: `${slug}.mp3`, url: `/public/audio/${slug}.mp3` });
	}

	try {
		const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
			method: 'POST',
			headers: {
				accept: 'audio/mpeg',
				'content-type': 'application/json',
				'xi-api-key': ELEVENLABS_API_KEY
			},
			body: JSON.stringify({
				text: content,
				voice_settings: {
					stability: 0,
					similarity_boost: 0
				}
			})
		});
		console.log(response);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const file = slug;

		const audioDir = path.join('public', 'audio');
		if (!fs.existsSync(audioDir)) {
			fs.mkdirSync(audioDir, { recursive: true });
		}

		await fs.promises.writeFile(path.join('public', 'audio', `${file}.mp3`), buffer);
		console.log('File written successfully', path.join('public', 'audio', `${file}.mp3`));

		return JSON.stringify({ file: `${file}.mp3`, url: `/public/audio/${file}.mp3` });
	} catch (error) {
		console.error('Error generating audio:', error);
	}
}
