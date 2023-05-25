import { EntityBase } from '@mollify/types';
import { setEntityTitlePrompt } from './title';
import { selectEntityTypePrompt } from './type';
import { ROOT_ENTITIES } from '../../constants';
import { setEntityTagsPrompt } from './tags';
import {
  PROMPT_ROOT_ENTITY_TAGS,
  PROMPT_ROOT_ENTITY_TITLE,
  PROMPT_ROOT_ENTITY_TYPE_SELECT,
} from '../../localisation';

export async function defineEntityPrompt(
  entity: Partial<EntityBase>,
  messages = {
    title: PROMPT_ROOT_ENTITY_TITLE,
    type: PROMPT_ROOT_ENTITY_TYPE_SELECT,
    tags: PROMPT_ROOT_ENTITY_TAGS,
  },
) {
  if (!entity.title) {
    entity.title = await setEntityTitlePrompt(messages.title);
  }

  if (!entity.type) {
    entity.type = await selectEntityTypePrompt(ROOT_ENTITIES, messages.type);
  }

  if (!entity.tags || !entity.tags.length) {
    entity.tags = await setEntityTagsPrompt(entity.tags || [], messages.tags);
  }

  return entity as EntityBase;
}
