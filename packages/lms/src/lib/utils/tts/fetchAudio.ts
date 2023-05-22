export async function fetchAudio(slug: string) {
	const response = await fetch(`/api/tts/getAudio`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ slug })
	});
	console.log('response', response);
	const data = await response.json();
	console.log('data', data);
	return data;
}
