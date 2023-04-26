<script lang="ts">
	import { onMount } from 'svelte';
	import ProgrammeNav from '../nav/ProgrammeNav.svelte';
	import CourseNav from '../nav/CourseNav.svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';

	let institutes = {};
	let current = {};
	let isCourse = false;

	if (browser) {
		onMount(async () => {
			const unsubscribe = files.subscribe((data) => {
				institutes = data;
			});

			return () => unsubscribe();
		});
	}

	const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
	const objectPath = path.replace('/content/', '');
	const pathArray = objectPath.split('/');
	const currentPath: string = pathArray[pathArray.length - 1];

	$: {
		current = getCurrent(institutes, pathArray);
		if (
			current?.frontmatter?.type === 'Course' ||
			current?.frontmatter?.type === 'Module' ||
			current?.frontmatter?.type === 'Lesson'
		) {
			isCourse = true;
		} else {
			isCourse = false;
		}
	}
</script>

{#if isCourse}
	<!-- If current path is to a course/module/lesson -->
	<main>
		<div>
			<nav>
				<CourseNav data={current} {currentPath} />
			</nav>
			<section>
				<slot />
			</section>
		</div>
	</main>
{:else if !isCourse && current !== undefined}
	<!-- If current path is to an institute or programme -->
	<ProgrammeNav data={current}>
		<slot />
	</ProgrammeNav>
{:else}
	<!-- If current path is to a page that doesn't exist -->
	<main>
		<slot />
	</main>
{/if}

<style>
	main {
		padding: 1rem;
	}
	@media (min-width: 768px) {
		div {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}
</style>
