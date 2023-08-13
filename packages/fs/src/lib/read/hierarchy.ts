import { listEntityPaths, parseHierarchy } from "$lib/index.js";

export async function readHierarchy(basePath: string) {
    const files = await listEntityPaths(basePath);
    const data = parseHierarchy(files)
}