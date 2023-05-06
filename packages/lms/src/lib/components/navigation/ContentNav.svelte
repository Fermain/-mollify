<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';
	import type { EntityMeta } from '@mollify/types';

	let institutes: EntityMeta[] | null = [];
	let current: EntityMeta | undefined;
	let isCourse = false;
	let pathArray: string[] = [];
	let currentPath: string;

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
			const data = await response.json();
			files.set(data);
		}
	});

	function updatePath() {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
	}

	if (browser) {
		updatePath();
		current = getCurrent(institutes, pathArray);
	}

	$: {
		if ($files) {
			institutes = $files;
			current = getCurrent(institutes, pathArray);
		}
		page.subscribe((data) => {
			updatePath();
		});
		isCourse = current?.type === 'course';
	}
</script>

{#if institutes}
	<nav class="nav2">
		<div class="wrapper">
			<h2>Recursive Nav</h2>
			<RecursiveNav data={institutes} {currentPath} />
		</div>
	</nav>
	{#if isCourse}
		<nav class="nav1">
			<!-- If current path is to a course/module/lesson -->
			<h2>Course Nav</h2>
			<CourseNav data={current} {currentPath} />
		</nav>
	{/if}
{/if}

<style>
	h2 {
		margin: 0;
	}
	.nav1 {
		grid-area: nav1;
	}

	.nav2 {
		grid-area: nav2;
	}

	.wrapper {
		margin-bottom: 1.5rem;
	}
</style>
