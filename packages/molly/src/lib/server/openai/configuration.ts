import { OPENAI_API_KEY as apiKey } from '$lib/server/optional.config';
import { Configuration } from 'openai';
export default new Configuration({ apiKey });
