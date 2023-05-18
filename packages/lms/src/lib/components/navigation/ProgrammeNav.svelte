<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrentPageEntityMeta } from '$lib/utils/getCurrentPageEntityMeta';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { EntityMeta } from '@mollify/types';
	let institutes: EntityMeta[] | null = [];
	let current: EntityMeta = {} as EntityMeta;
	let isProgramme = false;
	let pathArray: string[];

	if (browser) {
		onMount(() => {
			const unsubscribe = files.subscribe((data) => {
				institutes = data;
			});

			return () => unsubscribe();
		});
	}

	$: page.subscribe((data) => {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		let currentPath = pathArray[pathArray.length - 1];
		current = getCurrentPageEntityMeta(institutes || [], pathArray) || ({} as EntityMeta);

		if (current?.type === 'institution' || current?.type === 'programme') {
			isProgramme = true;
		} else {
			isProgramme = false;
		}
	});
</script>

<slot />
{#if isProgramme}
	<section>
		<h2>
			{current?.title}
			{current?.type === 'institution' ? 'Programmes' : 'Courses'}
		</h2>
		<div class="inst-grid">
			{#each current.children as child}
				<div class="card p-4">
					<h3 class="card-header">{child.title}</h3>
					{#if child.url}
						<img src={child.url} alt={child.title} />
					{/if}
					<p class="p-4">{child.summary}</p>
					<a class="card-footer btn variant-filled bg-primary-500 p-2" href={child.browserPath}>View Details</a>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.inst-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
