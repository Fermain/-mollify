import matter from "gray-matter";
import type { EntityBase, EntityMeta } from "@mollify/types";
import { error } from "console";
import path from "path";

export function parseEntityBase(file: string) {
    try {
        const { data, content } = matter(file);
        const base = data as EntityBase;

        if (base) {
            return {
                ...base,
                content
            } as EntityBase
        }

        throw new Error("Invalid entity base");
    } catch (err) {
        error(err);
        return null;
    }
}

export function parseEntityMeta(file: string, filePath: string) {
    try {
        const base = parseEntityBase(file);
        if (base) {
            const paths = parseEntityPath(filePath);
            const meta: EntityMeta = {
                ...base,
                ...paths
            };

            return meta;
        }
        throw new Error("Could not resolve entity base");
    } catch (err) {
        error(err);
        return null;
    }
}

export function parseEntityPath(filePath: string) {
    const address = path.resolve(filePath);
    const pageFileName = '+page.md';

    if (!address.endsWith(pageFileName)) {
        throw new Error(`Entity file does not have the expected file name: ${filePath} [${pageFileName}]`);
    }

    const entityFolder = path.dirname(address);
    const slug = path.basename(entityFolder);
    const browserPath = address.split("src/routes").at(-1)?.split(`/${pageFileName}`).at(0) || "/404";

    return {
        slug,
        address,
        browserPath
    }
}