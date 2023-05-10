import { generateAudio } from '$lib/utils/generateAudio.js';

export async function POST({ request }): Promise<object> {
	const { text } = await request.json();

	try {
		// Convert text to audio using ElevenLabs API
		const audio = await generateAudio(text);

		return new Response(audio);
	} catch (error) {
		console.error('Error converting text to speech:', error);

		return new Response(JSON.stringify({ error: 'Failed to convert text to speech' }), {
			status: 500
		});
	}
}
