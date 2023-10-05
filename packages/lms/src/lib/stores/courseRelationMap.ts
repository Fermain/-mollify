import { browser } from '$app/environment';
import type { EntityMeta } from '@mollify/types';
import { writable, type Writable } from 'svelte/store';

interface hierarchyNode {
  parentAddress: string | null;
  children: string[];
}

// builds a map that enables easier tree traversal in course content
async function buildHierarchyMap() {
  const response = await fetch('/api/getEntityMetaTree');
  const tree: EntityMeta[] = await response.json();
  const map: Map<string, hierarchyNode> = new Map();

  function callback(node: EntityMeta, parentAddress: string | null = null) {
    map.set(node.browserPath as string, {
      parentAddress,
      children: node.children.map((child) => String(child.browserPath)) ?? []
    });

    if (node.children.length > 0) node.children.forEach((child) => callback(child, node.browserPath));
  }

  tree.forEach((node) => callback(node));

  return map;
}

// creates a store for using the relation map.
async function courseRelationMapper() {
  const store: Writable<Map<string, hierarchyNode>> = writable(new Map());
  if (!browser) return store;

  const map = await buildHierarchyMap();
  store.set(map);

  return store;
}

export const courseRelationMap = await courseRelationMapper();
