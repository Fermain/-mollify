import { prompt } from "enquirer";
import { PROMPT_ENTITY_TYPE_SELECT  } from "../../localisation";
import { EntityType } from "@mollify/types";

export async function selectEntityType(choices: EntityType[], message = PROMPT_ENTITY_TYPE_SELECT) {
  const { type } = await prompt<{ type: EntityType; }>({
    type: 'select',
    name: 'type',
    message,
    choices,
  });
  return type;
}