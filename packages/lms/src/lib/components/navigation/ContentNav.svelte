<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';

	interface Frontmatter {
		type?: 'Course' | 'Module' | 'Lesson' | 'Institute' | 'Programme';
		// Add other properties as needed, e.g., title, date, etc.
	}

	interface ContentObject {
		frontmatter?: Frontmatter;
		// Add other properties as needed, e.g., content, slug, etc.
	}

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
			const data = await response.json();
			files.set(data);
		}
	});

	let institutes: {} | null = {};
	let current: ContentObject = {};
	let isCourse = false;
	let pathArray: string[];
	let currentPath: string;

	function updatePath() {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
	}

	if (browser) {
		onMount(async () => {
			const unsubscribe = files.subscribe((data) => {
				institutes = data;
			});

			return () => unsubscribe();
		});

		updatePath();
	}

	$: page.subscribe((data) => {
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
		updatePath();
	});
</script>

<nav class="nav1">
	{#if institutes}
		<div class="wrapper">
			<h2>Recursive Nav</h2>
			<RecursiveNav data={institutes} {currentPath} open={false} path="/content/" />
		</div>
		{#if isCourse}
			<!-- If current path is to a course/module/lesson -->
			<h2>Course Nav</h2>
			<CourseNav data={current} {currentPath} />
		{/if}
	{/if}
</nav>

<style>
	h2 {
		margin: 0;
	}
	.nav1 {
		grid-area: nav1;
	}

	.wrapper {
		margin-bottom: 1.5rem;
	}
</style>
