import { createChatCompletion, createChatCompletionResponse } from './chatCompletion';
import { flagged, moderate } from './moderate';

export default {
	chat: {
		completion: {
			create: createChatCompletion,
			response: createChatCompletionResponse
		}
	},
	moderation: {
		moderate,
		isFlagged: flagged
	}
};
