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

		if (current?.type === 'Institution' || current?.type === 'Programme') {
			isProgramme = true;
		} else {
			isProgramme = false;
		}
	});
</script>

<slot />
{#if isProgramme}
	<section>
		<h2 class="h2 mb-8">
			{current?.title}
			{current?.type === 'Institution' ? 'Programmes' : 'Courses'}
		</h2>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each current.children as child}
				<a class="card p-3 variant-ghost-surface dark:text-slate-100 no-underline" href={child.browserPath}>
					<header class="card-header border-b p-0">
						<h3 class="h3">{child.title}</h3>
					</header>
					{#if child.url}
						<img src={child.url} alt={child.title} />
					{/if}
					<p class="font-normal">{child.summary}</p>
				</a>
			{/each}
		</div>
	</section>
{/if}
