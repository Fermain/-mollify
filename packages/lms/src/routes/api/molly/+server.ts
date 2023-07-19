import { OPENAI_API_KEY, OPENAI_TOKEN_LIMIT } from '$env/static/private';
import { MollyAI } from '@mollify/molly';

const molly = new MollyAI(OPENAI_API_KEY, OPENAI_TOKEN_LIMIT)

export const POST = molly.handlers.chatCompletion.POST;

export const GET = molly.handlers.chatCompletion.GET;
