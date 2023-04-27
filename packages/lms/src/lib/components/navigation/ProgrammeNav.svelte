<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let institutes: {} | null = {};
	let current = {};
	let isProgramme = false;
	let pathArray: string[];
	let currentPath: string;

	if (browser) {
		onMount(() => {
			const unsubscribe = files.subscribe((data) => {
				institutes = data;
				console.log('institutes', institutes);
			});

			return () => unsubscribe();
		});
	}

	$: page.subscribe((data) => {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
		current = getCurrent(institutes, pathArray);

		if (current?.frontmatter?.type === 'Institute' || current?.frontmatter?.type === 'Programme') {
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
			{current.frontmatter?.title}
			{current.frontmatter?.type === 'Institute' ? 'Programmes' : 'Courses'}
		</h2>
		<div class="inst-grid">
			{#each Object.entries(current) as [institute, instituteData]}
				{#if institute !== 'frontmatter'}
					<div class="card">
						{#if instituteData.frontmatter}
							<h3>{instituteData.frontmatter.title}</h3>
							<img src={instituteData.frontmatter.url} alt={instituteData.frontmatter.title} />
							<p>{instituteData.frontmatter.summary}</p>
							<a href={`/content/${instituteData.frontmatter.path}`}>View Details</a>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</section>
{/if}

<style>
	main {
		padding: 1rem;
		max-width: 800px;
		margin: 0 auto;
	}

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
		color: black;
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
