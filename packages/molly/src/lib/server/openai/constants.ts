import type { CreateChatCompletionRequest } from 'openai';

export const DEFAULT_CHAT_CONFIG: Partial<CreateChatCompletionRequest> & { model: string } = {
  model: 'gpt-4',
  frequency_penalty: 0,
  presence_penalty: 0,
  temperature: 0.9,
  max_tokens: 300,
  top_p: 1,
  stream: true
};
