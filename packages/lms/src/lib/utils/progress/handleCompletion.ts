import { progressStore } from '$lib/stores/courseProgress';
import { get } from 'svelte/store';
import { courseRelationMap } from '$lib/stores/courseRelationMap';

export default function handleCompletion(address: string) {
	const progress = get(progressStore);
	const parentMap = get(courseRelationMap);

	const relationMap = parentMap.get(address as string);
	if (!relationMap) return;

	const children = relationMap.children;
	const allChildrenCompleted = children.every((child) => progress.has(child));

	if (children.length === 0 || allChildrenCompleted) {
		progressStore.setComplete(address);
		handleCompletion(relationMap.parentAddress as string);
	}
}
