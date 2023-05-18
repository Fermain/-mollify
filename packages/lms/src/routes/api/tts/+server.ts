import tts from '$lib/tts/index.js';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { text, slug } = await request.json();

	try {
		// Convert text to audio using ElevenLabs API
		const audio = await tts.generateAudio(text, slug);		

		return new Response(audio);
	} catch (err) {
		console.error('Error converting text to speech:', err);
		throw error(500, String(err))
	}
}
