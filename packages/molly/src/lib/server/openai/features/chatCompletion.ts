import type { CreateChatCompletionRequest } from 'openai';

// It's this way for now until I can figure out how to pass the stream nicely
export async function createChatCompletionResponse(token: string, options: CreateChatCompletionRequest) {
	const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(options)
	});

	if (!chatResponse.ok) {
		const err = await chatResponse.json();
		throw new Error(err.error.message);
	}

	return chatResponse;
}