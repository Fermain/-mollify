import fs from 'fs-extra';
import { parseEntity } from './parse';
import { glob } from 'glob';

export async function getEntity(filePath: string) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const entity = parseEntity(fileContent, filePath);
    return entity;
}

export async function getEntityBySlug(slug: string) {
    const matches = await glob(`**/${slug}/+page.md`);
    if (matches.length) {
        return getEntity(matches[0]);
    }

    return null
}