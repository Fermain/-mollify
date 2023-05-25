import { EntityMeta } from "@mollify/types";
import { prompt } from "enquirer";
import { PROMPT_ENTITY_SELECT } from "../../localisation";

export async function selectEntity(entities: EntityMeta[], message = PROMPT_ENTITY_SELECT) {
  const { index } = await prompt<{ index: number; }>({
    type: 'autocomplete',
    name: 'index',
    message,
    choices: entities.map((entity, index) => ({
      name: `${entity.title} (${entity.type})`,
      value: String(index),
    })),
    initial: 0
  });
  return entities[Number(index)];
}