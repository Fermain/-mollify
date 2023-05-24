import { EntityBase, EntityType } from '@mollify/types';
import { setEntityTitlePrompt } from './title';
import { selectEntityTypePrompt } from './type';
import { ALL_ENTITIES } from '../../constants';
import { setEntityTagsPrompt } from './tags';
import { PROMPT_ENTITY_TAGS, PROMPT_ENTITY_TITLE, PROMPT_ROOT_ENTITY_TAGS } from '../../localisation';

export async function defineEntityPrompt(
  entity: Partial<EntityBase>,
  messages = {
    title: PROMPT_ENTITY_TITLE,
    type: PROMPT_ROOT_ENTITY_TAGS,
    tags: PROMPT_ENTITY_TAGS,
  },
  typeChoices: Array<EntityType> = ALL_ENTITIES,
) {
  if (!entity.title) {
    entity.title = await setEntityTitlePrompt(messages.title);
  }

  if (!entity.type) {
    entity.type = await selectEntityTypePrompt(typeChoices, messages.type);
  }

  if (!entity.tags || !entity.tags.length) {
    entity.tags = await setEntityTagsPrompt(entity.tags || [], messages.tags);
  }

  return entity as EntityBase;
}
