import { progressStore } from '$lib/stores/courseProgress';
import { courseRelationMap } from '$lib/stores/courseRelationMap';
import { get } from 'svelte/store';

/**
 * a function to calculate the progress of the course. defaults to the whole course,
 * but can take in an addressId which will check for progress for that specific module and return that percentage
 * @param addressId identifier for contextual progress tracker. if omitted, it calculates the whole course.
 * @returns percentage of completed entities
 */
export default function calculateProgress(addressId = '') {
	const progress = get(progressStore);
	const courseRelationStore = get(courseRelationMap);

	let entries: string[] = [];

	if (addressId) {
		const currentPage = courseRelationStore.get(addressId + '/');
		entries = currentPage?.children.length ? [...currentPage.children] : [addressId];
	} else {
		entries = [...courseRelationStore.keys()];
	}

	const total = entries.length;
	let completedCounter = 0;

	entries.forEach((entry) => {
		const entryCompleted = progress.has(entry);
		if (entryCompleted) completedCounter++;
	});

	return (completedCounter / total) * 100;
}
