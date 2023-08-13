import { fileIsInContent, readEntityBase, readEntityMeta } from '$lib/index.js';
import * as glob from 'glob';
import path from 'path';

export async function listEntityPaths(basePath: string) {
    if (!fileIsInContent(basePath)) {
        throw new Error("Invalid base path, must be within /content");
    }

    const pattern = path.join(basePath, '**/*', '+page.md');
    const ignorePatterns = [path.join('node_modules', '**/*')];
    return glob.sync(pattern, { ignore: ignorePatterns });
}

export async function listEntityMeta(basePath: string) {
    const files = await listEntityPaths(basePath);
    return await Promise.all(files.map(readEntityMeta));
}

export async function listEntityBase(basePath: string) {
    const files = await listEntityPaths(basePath);
    return await Promise.all(files.map(readEntityBase));
}

export async function listEntityStructure(basePath: string) {
    const files = await listEntityPaths(basePath);
    // const structuredFiles = parse(files);
}