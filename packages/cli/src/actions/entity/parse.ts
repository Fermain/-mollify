import { EntityBase, EntityMeta } from "@mollify/types";
import matter from "gray-matter";
import entitySlug from "./slug";

export function parseEntity(file: string, fileName: string): EntityMeta {
    const { data } = matter(file);
    const slug = entitySlug.get(fileName);
    const base = data as EntityBase;
    return {
        ...base,
        slug,
        address: fileName,
        children: [],
    };
}