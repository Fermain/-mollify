<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
	import { browser } from '$app/environment';
	import { AddRemoveBookmarks } from '$lib/utils/bookmarking/AddRemove';
	import { bookmarks } from '$lib/stores/bookmarks';
	let bookmarksStore = bookmarks;

	if (browser) {
		window.addBookmark = async function addBookmark(id) {
			console.log('addBookmark', id);
			bookmarksStore = await AddRemoveBookmarks(id);
			bookmarks.set(bookmarksStore);
		};
	}
</script>

<main class="p-5 w-full">
	<div class="prose max-w-none sm:w-3/4" id="prose-container">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>
