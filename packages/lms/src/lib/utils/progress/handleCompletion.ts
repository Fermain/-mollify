import { progressMapStore } from "$lib/stores/courseProgress";
import { get } from "svelte/store";
import { courseRelationMap } from "$lib/stores/courseRelationMap";

export default function handleCompletion(address: string) {
	const progressStore = get(progressMapStore)
	const parentMap = get(courseRelationMap)
	const parent = parentMap.get(address)
	if (!parent) return

	if (parent.children.length > 0) {
		const allChildrenCompleted = parent.children.every(child => progressStore.get(child))
		if (!allChildrenCompleted) return false

		progressMapStore.setComplete(address, true)
		handleCompletion(String(parent.parentAddress))

	} else {
		progressMapStore.setComplete(address, true)
	}
};

