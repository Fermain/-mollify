import { page } from '$app/stores';
import { progressStore } from '$lib/stores/courseProgress';
import debounce from '../functions/debounce';
import handleCompletion from './handleCompletion';
import { get } from 'svelte/store';

export default async function observeContentProgress() {
	const childElement = document.querySelector('#content');
	const parentElement = document.querySelector('#page');
	if (!childElement || !parentElement) return;

	const currentPage = decodeURIComponent(window.location.pathname) + '/';
	const progress = get(progressStore);
	const completionStatus = progress.has(currentPage);
	if (completionStatus === true) return;

	const debouncedCompletionCheck = debounce(() => {
		const childRect = childElement.getBoundingClientRect();
		const parentHeight = parentElement.getBoundingClientRect().bottom;

		if (childRect.bottom <= parentHeight) {
			handleCompletion(currentPage);
			parentElement.removeEventListener('scroll', debouncedCompletionCheck);
		}
	}, 300);

	page.subscribe((page) => {
		if (page.url + '/' !== currentPage) parentElement.removeEventListener('scroll', debouncedCompletionCheck);
	});

	debouncedCompletionCheck();
	parentElement.addEventListener('scroll', debouncedCompletionCheck);
}
