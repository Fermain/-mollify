import { OPENAI_TOKEN_LIMIT, OPENAI_API_KEY } from "$lib/server/optional.config";
import MollyAI from "$lib/server/openai";

const molly = new MollyAI(OPENAI_API_KEY, Number(OPENAI_TOKEN_LIMIT));

export const GET = molly.handlers.chatCompletion.GET;