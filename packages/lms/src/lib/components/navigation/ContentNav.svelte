<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import RecursiveNav from './RecursiveNav.svelte';
	import ProgrammeNav from './ProgrammeNav.svelte';
	import CourseNav from './CourseNav.svelte';

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
			const data = await response.json();
			files.set(data);
		}
	});

	let institutes: {} | null = {};
	let current = {};
	let isCourse = false;
	let pathArray: string[];
	let currentPath: string;

	if (browser) {
		onMount(async () => {
			const unsubscribe = files.subscribe((data) => {
				institutes = data;
				console.log('institutes', institutes);
			});

			return () => unsubscribe();
		});

		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
	}

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

<nav class="nav1">
	{#if institutes}
		<!-- <ProgrammeNav data={institutes} {currentPath} /> -->
		{#if isCourse}
			<!-- If current path is to a course/module/lesson -->
			<CourseNav data={current} {currentPath} />
		{/if}
	{/if}
</nav>

<style>
	.nav1 {
		grid-area: nav1;
	}
</style>
