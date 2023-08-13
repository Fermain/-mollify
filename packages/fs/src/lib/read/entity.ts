import { parseEntityBase, parseEntityMeta } from "$lib/index.js";
import fs from "fs-extra";
import { error } from "console";

export async function readEntityBase(path: string) {
    try {
        const file = await fs.readFile(path, "utf-8");
        const base = parseEntityBase(file);

        if (base) {
            return base;
        }

        throw new Error("Could not parse entity base");
    } catch (err) {
        error(err);
        return null;
    }
}

export async function readEntityMeta(path: string) {
    try {
        const file = await fs.readFile(path, "utf-8");
        let meta = parseEntityMeta(file, path);

        if (meta) {
            return meta;
        }

        throw new Error("Could not parse entity meta");
    } catch (err) {
        error(err);
        return null;
    }
}
