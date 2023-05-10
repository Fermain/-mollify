import { generateAudio } from '$lib/utils/generateAudio.js';

export async function POST({ request }): Promise<object> {
	console.log(request);
	const { text } = await request.body.json();

	try {
		// Convert text to audio using ElevenLabs API
		const audio = await generateAudio(text);
		console.log(audio);

		return {
			status: 200,
			body: {
				audio: audio
			}
		};
	} catch (error) {
		console.error('Error converting text to speech:', error);

		return {
			status: 500,
			body: {
				error: 'Failed to convert text to speech'
			}
		};
	}
}
