import debounce from "../debounce";
import * as storage from "../storage";
import handleCompletion from "./handleCompletion";

export default function observeContentProgress() {
	const childElement = document.querySelector('#content');
	const parentElement = document.querySelector('#page');
	if (!childElement || !parentElement) return

	const currentPage = decodeURIComponent(window.location.pathname) + "/"
	const completionMap = new Map(storage.load("contentCompletionMap"))
	const completionStatus = completionMap.get(currentPage);

	if (completionStatus === true) return;

	const debouncedCompletionCheck = debounce(() => {
		const childRect = childElement.getBoundingClientRect();
		const parentHeight = parentElement.getBoundingClientRect().bottom

		if (childRect.bottom <= parentHeight) {
			handleCompletion(currentPage)
			// storage.save("contentCompletionMap", [...completionMap])
			parentElement.removeEventListener('scroll', debouncedCompletionCheck);
		}

	}, 300)

	debouncedCompletionCheck()

	parentElement.addEventListener('scroll', debouncedCompletionCheck)
}

