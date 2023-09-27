import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';
import type { RequestHandler } from '../../../routes/$types';
import { isWithinTokenLimit } from 'gpt-tokenizer';
import { error } from '@sveltejs/kit';
import prompts from './prompts';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BaseMessage, HumanMessage, SystemMessage, AIMessage } from 'langchain/schema';

const TEMP_USER = 'Ask the student for their name.';
const TEMP_CONTENT = 'Ask the student for their question.';

export default class MollyAI {
  openaiApiKey: string;
  configuration: Configuration;
  api: OpenAIApi;

  constructor(openaiApiKey: string, private tokenLimit: number | string) {
    this.tokenLimit = Number(tokenLimit);
    this.openaiApiKey = openaiApiKey;
    this.configuration = new Configuration({ apiKey: this.openaiApiKey });
    this.api = new OpenAIApi(this.configuration);
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
      POST: async ({ request }) => {
        const body = await request.json();

        try {
          // validation
          const {
            messages,
            query,
            documentContent,
            name
          }: {
            messages: ChatCompletionRequestMessage[];
            query: string;
            documentContent: string;
            name: string;
          } = body;

          if (!query) return new Response('Bad Request: No query provided', { status: 400 });

          const tokenCount = isWithinTokenLimit(query, Number(this.tokenLimit));
          if (!tokenCount) return new Response('Bad Request: Query too large', { status: 400 });

          const isFlagged = await this.flagged(documentContent + query);
          if (isFlagged) return new Response('Bad Request: Query flagged by openai', { status: 400 });

          const assistantPrompt = prompts.assistant(documentContent || TEMP_CONTENT, name || TEMP_USER);

          const recentChatHistory: BaseMessage[] = [];
          messages.slice(-4).forEach((msg) => {
            if (msg.role === 'assistant') return recentChatHistory.push(new AIMessage(String(msg.content)));
            if (msg.role === 'user') return recentChatHistory.push(new HumanMessage(String(msg.content)));
            recentChatHistory.push(new SystemMessage(String(msg.content)));
          });

          // current limit is to low for content. commenting this part out until we can agree to a specific content limit

          // const LIMIT = Number(this.tokenLimit);
          // const totalTokenCount = isWithinTokenLimit(assistantPrompt, LIMIT - tokenCount);
          // if (!totalTokenCount) return new Response('Bad Request: Query too large', { status: 400 });

          const key = this.openaiApiKey;
          const readableStream = new ReadableStream({
            async start(controller) {
              const chat = new ChatOpenAI({
                openAIApiKey: key,
                modelName: 'gpt-4',
                streaming: true,
                temperature: 0.9,
                callbacks: CallbackManager.fromHandlers({
                  handleLLMNewToken: async (token: string) => controller.enqueue(token)
                })
              });

              await chat.call([new SystemMessage(assistantPrompt), ...recentChatHistory, new HumanMessage(query)]);

              controller.close();
            }
          });

          // Create and return a response of the readable stream
          return new Response(readableStream, {
            headers: { 'Content-Type': 'text/plain' }
          });
        } catch (err) {
          console.error(err);
          return new Response('Internal Server Error: There was an error processing your request', {
            status: 500
          });
        }
      },
      GET: async ({ request }) => {
        throw error(405, 'Method Not Allowed');
      }
    }
  };
}
