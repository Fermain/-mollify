import { writable, type Writable } from 'svelte/store';
import type { EntityMeta } from '@mollify/types';

//store for file structure of the content folder.
export const files: Writable<EntityMeta[] | null> = writable(null);
