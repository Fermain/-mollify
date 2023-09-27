import { OPENAI_TOKEN_LIMIT, OPENAI_API_KEY } from '$env/static/private';
import MollyAI from '$lib/server/openai';

const molly = new MollyAI(OPENAI_API_KEY, Number(OPENAI_TOKEN_LIMIT));

export const POST = molly.handlers.chatCompletion.POST;
