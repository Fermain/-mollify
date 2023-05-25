import { EntityType } from "@mollify/types";
import { ENTITY_HIERARCHY } from "../constants";

export function validParents(entity: EntityType): EntityType[] | undefined {
  // Find the entity in the hierarchy
  const entityHierarchy = ENTITY_HIERARCHY.find((hierarchy) => hierarchy.name === entity);

  // If the entity exists, return its parent entities
  if (entityHierarchy && entityHierarchy.parents) {
    return entityHierarchy.parents;
  }

  // If the entity does not exist or has no parents, return undefined
  return undefined;
}