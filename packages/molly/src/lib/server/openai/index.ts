import {
	Configuration,
	OpenAIApi,
	type CreateChatCompletionRequest,
	type ChatCompletionRequestMessage
} from 'openai';
import { createChatCompletionResponse } from './features/chatCompletion';
import { isWithinTokenLimit } from 'gpt-tokenizer';
import { error, type RequestHandler } from '@sveltejs/kit';
import prompts from './prompts';

const TEMP_USER = 'Ask the student for their name.';
const TEMP_CONTENT = 'Ask the student for their question.';

export default class MollyAI {
	private readonly token: string;
	protected api: OpenAIApi;

	constructor(openaiApiKey: string, private tokenLimit: number | string) {
		this.tokenLimit = Number(tokenLimit);
		this.token = openaiApiKey;
		this.api = new OpenAIApi(new Configuration({ apiKey: this.token }));
	}

	async createChatCompletion(options: CreateChatCompletionRequest) {
		return await createChatCompletionResponse(this.token, options);
	}

	async flagged(input: string) {
		return (await this.moderate(input)).some((result) => result.flagged);
	}

	async moderate(input: string) {
		const {
			data: { results }
		} = await this.api.createModeration({ input });

		return results;
	}

	handlers: {
		[key: string]: {
			[key: string]: RequestHandler;
		};
	} = {
		chatCompletion: {
			POST: async () => {
				throw error(405, 'Method Not Allowed');
			},
			GET: async ({ request }: { request: Request }) => {
				const LIMIT = Number(this.token);

				const url = new URL(request.url);
				const messagesParam = url.searchParams.get('messages');
				const contentParam = url.searchParams.get('content');
				const nameParam = url.searchParams.get('name');

				if (!messagesParam) {
					throw error(400, 'No messages provided');
				}

				const messages: Array<ChatCompletionRequestMessage> = JSON.parse(messagesParam);
				const tokenCount = isWithinTokenLimit(messages.join('\n'), Number(this.tokenLimit));

				if (!tokenCount) {
					throw error(400, 'Query too large');
				}

				const lastMessage = messagesParam;
				const isFlagged = await this.flagged(lastMessage);

				if (isFlagged) {
					throw error(400, 'Query flagged by openai');
				}

				const role = 'system';
				const content = prompts.assistant(contentParam || TEMP_CONTENT, nameParam || TEMP_USER);
				const totalTokenCount = isWithinTokenLimit(content, LIMIT - tokenCount);

				if (!totalTokenCount) {
					throw error(400, 'Query too large');
				}

				messages.unshift({ role, content });

				const chatRequestOpts: CreateChatCompletionRequest = {
					model: 'gpt-4',
					messages,
					temperature: 0.9,
					stream: true
				};

				const chatResponse = await this.createChatCompletion(chatRequestOpts);

				return new Response(chatResponse.body, {
					headers: {
						'Content-Type': 'text/event-stream'
					}
				});
			}
		}
	};
}
