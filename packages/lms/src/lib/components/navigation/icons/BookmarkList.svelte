<script lang="ts">
	import * as storage from '$lib/utils/storage';
	export let parent: any;
	const bookmarks = storage.load('bookmarks');
</script>

<div
	class="modal block bg-surface-100-800-token w-modal h-auto p-4 space-y-4 rounded-container-token shadow-xl"
	data-testid="searchModal"
	role="dialog"
	aria-modal="true"
	aria-label="Your Bookmarks"
	style=""
>
	<header class="modal-header text-2xl font-bold">Your Bookmarks</header>
	{#if bookmarks.length > 0}
		{#each bookmarks as bookmark}
			<div class="flex flex-col space-y-2">
				<a href={bookmark.url} rel="noopener noreferrer" class="text-primary-500-token hover:underline"
					>{bookmark.url.split('/').pop() === '' ? 'Home' : bookmark.url.split('/').pop()}</a
				>
			</div>
		{/each}
	{/if}

	<footer class="modal-footer flex justify-end space-x-2">
		<button type="button" class="btn variant-ghost-surface" on:click={parent.onClose}>Close</button>
	</footer>
</div>
