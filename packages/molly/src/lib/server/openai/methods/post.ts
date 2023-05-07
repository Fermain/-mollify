import { type RequestHandler, error, json } from '@sveltejs/kit';
import { isWithinTokenLimit } from 'gpt-tokenizer';
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
import { createChatCompletionResponse } from '../features/chatCompletion';
import { flagged } from '../features/moderate';
import prompts from '../prompts';
import { OPENAI_TOKEN_LIMIT } from '$env/static/private';

export const chatCompletionPost: RequestHandler = async ({ request }) => {
	const LIMIT = Number(OPENAI_TOKEN_LIMIT);

	try {
		let { messages } = (await request.json()) as { messages: ChatCompletionRequestMessage[] };
		const tokenCount = isWithinTokenLimit(messages.join('\n'), LIMIT);

		if (!tokenCount) {
			throw error(400, 'Query too large');
		}

		const lastMessage = messages[messages.length - 1].content;
		const isFlagged = await flagged(lastMessage);

		if (isFlagged) {
			throw error(400, 'Query flagged by openai');
		}

		const role = 'system';
		const content = prompts.assistant('Test mode, there is no content yet.', 'Timmy Tester');
		const totalTokenCount = isWithinTokenLimit(content, LIMIT - tokenCount);

		if (!totalTokenCount) {
			throw error(400, 'Query too large');
		}

		messages = [{ role, content }, ...messages];

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-4',
			messages,
			temperature: 0.9,
			stream: true
		};

		const chatResponse = await createChatCompletionResponse(chatRequestOpts);

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		});
	} catch (err) {
		console.error(err);
		return json({ error: 'There was an error processing your request' }, { status: 500 });
	}
};
