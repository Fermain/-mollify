import { ELEVENLABS_API_KEY } from '$env/static/private';
import fs from 'fs';
import path from 'path';

export async function generateAudio(content: string) {
	const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
	console.log(content);
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

		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const file = Math.random().toString(36).substring(7);

		fs.writeFile(path.join('public', 'audio', `${file}.mp3`), buffer, () => {
			console.log('File written successfully');
		});

		return JSON.stringify({ file: `${file}.mp3` });
	} catch (error) {
		console.error('Error generating audio:', error);
	}
}
