export async function generateAudio(content: string) {
	try {
		const response = await fetch('https://api.eleven-labs.com/v1/synthesize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': import.meta.env.VITE_API_KEY
			},
			body: JSON.stringify({
				text: content,
				voice: 'en-US' // Choose the desired voice/language
			})
		});

		const { url } = await response.json();
		return url;
	} catch (error) {
		console.error('Error generating audio:', error);
	}
}
