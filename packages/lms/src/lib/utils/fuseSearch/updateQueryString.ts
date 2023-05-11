export function updateQueryString(newQuery: { [key: string]: string }) {
	const newUrl = new URL(window.location.href);
	newUrl.search = new URLSearchParams(newQuery).toString();

	// Modify the URL without refreshing the page
	window.history.pushState({ path: newUrl.href }, '', newUrl.href);
}
