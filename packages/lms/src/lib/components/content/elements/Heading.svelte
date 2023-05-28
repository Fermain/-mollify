<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { AddRemoveBookmarks } from '$lib/utils/bookmarking/AddRemove';
	import { bookmarks } from '$lib/stores/bookmarks';
	import { page } from '$app/stores';

	let bookmarksStore = $bookmarks;
	let id;
	let content;
	let text = '';
	let hasBookmark = false;
	let currentUrl = '';

	$: {
		if (browser) {
			hasBookmark = $bookmarks.some((b) => {
				const hasMatchingUrl = b.url.split('/').pop() === currentUrl.split('/').pop();
				const hasMatchingHeading = b.headings?.some((heading) => heading === text);
				return hasMatchingUrl && hasMatchingHeading;
			});
		}
	}

	$: page.subscribe((p) => {
		if (browser) {
			currentUrl = decodeURIComponent(window.location.pathname);
		}
	});

	onMount(() => {
		if (browser) {
			text = content.textContent;
			id = text.toLowerCase().replace(/\s/g, '-');
			currentUrl = decodeURIComponent(window.location.pathname);
			hasBookmark = $bookmarks.some((b) => {
				const hasMatchingUrl = b.url.split('/').pop() === currentUrl.split('/').pop();
				const hasMatchingHeading = b.headings?.some((heading) => heading === text);
				return hasMatchingUrl && hasMatchingHeading;
			});
		}
	});

	async function onclick() {
		console.log('addBookmark', text);
		const newBookmarks = await AddRemoveBookmarks(text);
		bookmarks.set(newBookmarks);
	}
</script>

<span bind:this={content} {id}>
	<slot {...content} />
</span>
<a href="#{id}" class="text-primary-500 no-underline mx-1"><i class="icon-f">link</i></a>
<button>
	{#if !hasBookmark}
		<i class="icon-f" on:click={(event) => onclick()}>bookmark_add</i>
	{:else}
		<i class="icon-f" on:click={(event) => onclick()}>bookmark_remove</i>
	{/if}
</button>
