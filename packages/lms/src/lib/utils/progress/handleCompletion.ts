import { progressMapStore } from '$lib/stores/courseProgress';
import { get } from 'svelte/store';
import { courseRelationMap } from '$lib/stores/courseRelationMap';

export default function handleCompletion(address: string) {
  const progressStore = get(progressMapStore);
  const parentMap = get(courseRelationMap);

  const relationMap = parentMap.get(address as string);
  if (!relationMap) return;

  const children = relationMap.children;
  const allChildrenCompleted = children.every((child) => progressStore.get(child));

  if (children.length === 0 || allChildrenCompleted) {
    progressMapStore.setComplete(address, true);
    handleCompletion(relationMap.parentAddress as string);
  }
}
