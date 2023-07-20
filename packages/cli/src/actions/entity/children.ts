import { EntityMeta } from "@mollify/types";
import { glob } from "glob";
import { getEntity } from "./get";

export async function getEntityChildren(entity: EntityMeta) {
    entity.address

    const basePath = entity.address.replace("+page.md", "");

    const pattern = basePath + "*/+page.md";

    const matches = await glob(pattern);

    const children = await Promise.all(matches.map(entity => getEntity(entity)));

    return children;
}

export async function populateEntityChildren(entity: EntityMeta) {
    entity.children = await getEntityChildren(entity);
    return entity;
}