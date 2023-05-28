import { prompt } from 'enquirer';
import { PROMPT_ENTITY_TITLE } from '../../localisation';

export async function setEntityTitlePrompt(message = PROMPT_ENTITY_TITLE) {
  const { title } = await prompt<{ title: string }>({
    type: 'input',
    name: 'title',
    message,
  });

  return title;
}
