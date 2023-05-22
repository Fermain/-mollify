
import { defineEntityPrompt } from './define';
import { selectEntity } from './select';
import { setEntityTagsPrompt } from './tags';
import { setEntityTitlePrompt } from './title';
import { selectEntityTypePrompt } from './type';

export default {
  define: defineEntityPrompt,
  select: selectEntity,
  type: {
    select: selectEntityTypePrompt
  },
  set: {
    title: setEntityTitlePrompt,
    tags: setEntityTagsPrompt
  }
};