<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';

	let institutes: [] | null = [];
	let current: ContentObject = {};
	let isCourse = false;
	let pathArray: string[];
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
		institutes = $files;
		current = getCurrent(institutes, pathArray);

		page.subscribe((data) => {
			updatePath();
		});
		isCourse = current?.type === 'course';
	}
</script>

<div class="content-nav-wrapper">
	{#if institutes}
		<nav class="nav2 box">
			<div class="wrapper">
				<h2 class="test">Recursive Nav</h2>
				<RecursiveNav data={institutes} {currentPath} />
			</div>
		</nav>
	{/if}
	{#if isCourse}
		<!-- If current path is to a course/module/lesson -->
		<nav class="nav1 box">
			<h2 class="test">Course Nav</h2>
			<CourseNav data={current} {currentPath} />
		</nav>
	{/if}
</div>

<style lang="scss">
	.content-nav-wrapper {
		border: 2px solid black;
		grid-area: navs;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 10rem));
		gap: 0.5rem;
	}

	.content-nav-wrapper > .box {
		container-type: inline-size;
	}

	h2 {
		margin: 0;
	}

	.wrapper {
		margin-bottom: 1.5rem;
	}

	@container (min-width: 500px) {
		.content-nav-wrapper > .test {
			color: blue;
		}
	}
</style>
