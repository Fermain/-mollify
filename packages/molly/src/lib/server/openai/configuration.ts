import { OPENAI_API_KEY as apiKey } from '$env/static/private';
import { Configuration } from 'openai';
export default new Configuration({ apiKey });
