import { progressMapStore } from "$lib/stores/courseProgress";
import { courseRelationMap } from "$lib/stores/courseRelationMap";
import { get } from "svelte/store";

export default function calculateProgress() {
	const progressStore = get(progressMapStore)
	const courseRelationStore = get(courseRelationMap)

	const total = courseRelationStore.size;
	let completedCounter = 0;

	for (const entry of courseRelationStore.keys()) {
		const entryCompleted = progressStore.get(entry)
		if (entryCompleted) completedCounter++
	}

	return completedCounter / total * 100
}