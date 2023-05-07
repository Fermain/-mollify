import { OPENAI_API_KEY } from '$env/static/private';
import type { CreateChatCompletionRequest } from 'openai';
import api from './api';

// It's this way for now until I can figure out how to pass the stream nicely
export async function getChatCompletionResponse(options: CreateChatCompletionRequest) {
	const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			Authorization: `Bearer ${OPENAI_API_KEY}`,
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

export async function getChatCompletion(options: CreateChatCompletionRequest) {
	return (await api.createChatCompletion(options)).data;
}