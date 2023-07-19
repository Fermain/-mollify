<script>
	import Tags from '../tags/Tags.svelte';
	import { TableOfContents } from '@skeletonlabs/skeleton';

	export let title = '';
	export let tags = [''];
</script>

<svelte:head>
	<title>{title ? `${title} | ` : ''}Mollify LMS</title>
	<meta property="og:title" content={title} />
	<meta property="og:image" content="/brand/og.png" />
</svelte:head>

<div class="content-grid">
	{#if title}
		<h1>{title}</h1>
	{/if}
	<Tags {tags} />
	<div class="toc-container">
		<TableOfContents width="w-auto" label="" target="#page" allowedHeadings="h2" />
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.content-grid {
		display: grid;
		gap: 0 1rem;
		grid-template-columns: minmax(0, 88ch) minmax(min-content, 20rem);
		grid-template-rows: auto auto 1fr;
		grid-template-areas:
			'heading toc'
			'tags    toc'
			'content toc';

		& h1 {
			grid-area: heading;
		}

		@media (max-width: 1200px) {
			grid-template-columns: minmax(0, 88ch) min-content;
		}

		@media (max-width: 800px) {
			display: block;
		}
	}

	.content {
		grid-area: content;
	}

	.toc-container {
		grid-area: toc;
	}
</style>
