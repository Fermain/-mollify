<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
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
		current = getCurrent(institutes || [], pathArray) || ({} as EntityMeta);

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
				<div class="card">
					<h3>{child.title}</h3>
					<img src={child.url} alt={child.title} />
					<p>{child.summary}</p>
					<a href={child.browserPath}>View Details</a>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.card {
		max-width: 300px;
		margin: 1rem;
		padding: 1rem;
		box-shadow: 0 2px 8px var(--primary);
		border-radius: 1rem;
	}

	.card img {
		width: 100%;
	}

	.card a {
		display: block;
		text-align: center;
		margin-top: 1rem;
		padding: 0.5rem;
		background-color: var(--secondary);
		color: var(--text-primary);
		border-radius: 0.5rem;
		text-decoration: none;
		font-size: 1.25rem;
	}

	.inst-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
