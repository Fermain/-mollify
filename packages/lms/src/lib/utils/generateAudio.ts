export async function generateAudio(content: string) {
	const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
	try {
		const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
			method: 'POST',
			headers: {
				accept: 'audio/mpeg',
				'content-type': 'application/json',
				'xi-api-key': ''
			},
			body: content
		});

		const { url } = await response.json();
		console.log('15', url);
		return url;
	} catch (error) {
		console.error('Error generating audio:', error);
	}
}
