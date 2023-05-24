import { prompt } from 'enquirer';
import { PROMPT_ENTITY_TAGS } from '../../localisation';

export async function setEntityTagsPrompt(suggestions = new Array<string>(), message = PROMPT_ENTITY_TAGS) {
  const { tags } = await prompt<{ tags: string[] }>({
    type: 'list',
    name: 'tags',
    message,
    initial: suggestions,
  });

  return tags;
}