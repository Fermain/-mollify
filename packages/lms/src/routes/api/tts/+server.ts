import generateAudio from '@mollify/tts';
import { ELEVENLABS_API_KEY } from '$env/static/private';
// import tts from '$lib/tts/index.js';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { text, slug } = await request.json();

	try {
		// Convert text to audio using ElevenLabs API
		const audio = await generateAudio(text, slug, ELEVENLABS_API_KEY);

		return new Response(audio);
	} catch (err) {
		console.error('Error converting text to speech:', err);
		throw error(500, String(err));
	}
};
